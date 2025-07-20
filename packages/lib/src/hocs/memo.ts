import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";

type MemoizedCache<P extends object, T extends FunctionComponent<P>> = {
  prevProps: P | undefined;
  prevResult: ReturnType<T>;
};

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 메모이제이션된 컴포넌트 생성
  const MemoizedComponent: FunctionComponent<P> = (props: P) => {
    // 1. 이전 props와 렌더링 결과를 저장할 ref 생성
    const cache = useRef<MemoizedCache<P, typeof Component>>({
      prevProps: undefined,
      prevResult: undefined as ReturnType<typeof Component>,
    });

    // 2. equals 함수를 사용하여 props 비교
    const propsChanged = cache.current.prevProps === undefined || !equals(cache.current.prevProps, props);

    // 3. props가 변경된 경우에만 새로운 렌더링 수행
    if (propsChanged) {
      cache.current.prevResult = Component(props);
      cache.current.prevProps = props;
    }

    // 4. 메모이제이션된 결과 반환
    return cache.current.prevResult;
  };

  // 디버깅을 위한 displayName 설정
  MemoizedComponent.displayName = `memo(${Component.displayName || Component.name || "Component"})`;

  return MemoizedComponent;
}
