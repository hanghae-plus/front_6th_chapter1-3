import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";
/*
props를 얕은 비교를 통해 검사 후
props가 변경 되었을 경우 새로 렌더링
변경되지 않았을 경우 이전 렌더 결과 재사용
*/
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 1. 이전 props를 저장할 ref 생성

  // 2. 메모이제이션된 컴포넌트 생성

  // 3. equals 함수를 사용하여 props 비교

  // 4. props가 변경된 경우에만 새로운 렌더링 수행
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<ReturnType<FunctionComponent<P>> | null>(null);
    if (!equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      prevResultRef.current = Component(props);
    }

    return prevResultRef.current;
  };

  return MemoizedComponent;
}
