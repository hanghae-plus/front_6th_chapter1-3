import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P): ReturnType<typeof Component> => {
    // 1. 이전 props와 이전 렌더 결과를 저장할 ref 생성
    const prevPropsRef = useRef<P | undefined>(undefined);
    const prevResultRef = useRef<ReturnType<typeof Component> | undefined>(undefined);

    // 2. 이전 props 가져오기
    const prevProps = prevPropsRef.current;

    // 3. equals 함수를 사용하여 props 비교
    // 첫 렌더링이거나 props가 변경된 경우에만 새로 렌더링
    const shouldRender = prevProps === undefined || !equals(prevProps, props);

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    if (shouldRender) {
      prevPropsRef.current = props;
      prevResultRef.current = Component(props);
    }

    // 5. 메모이제이션된 결과 반환
    return prevResultRef.current!;
  };

  return MemoizedComponent;
}
