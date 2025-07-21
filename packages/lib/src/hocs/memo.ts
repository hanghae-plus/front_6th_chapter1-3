import { type FunctionComponent, createElement } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 2. 메모이제이션된 컴포넌트 생성
  const MemoizedComponent: FunctionComponent<P> = (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | undefined>(undefined);
    // 3. equals 함수를 사용하여 props 비교
    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    if (prevPropsRef.current === undefined || !equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      return createElement(Component, props);
    }
  };
  return MemoizedComponent;
}
