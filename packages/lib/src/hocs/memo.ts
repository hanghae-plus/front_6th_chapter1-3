import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 1. 컴포넌트 반환하는 것이 아닌, 컴포넌트를 반환하는 함수를 반환한다.
  return function MemoizedComponent(props: P) {
    // 2. 이전 props와 컴포넌트 렌더링 결과를 저장한다.
    const prevPropsRef = useRef<P | null>(null);
    const componentRef = useRef<ReturnType<FunctionComponent<P>> | null>(null);

    // 3. 이전 props가 없거나, 현재 props와 이전 props를 비교해 다르다면
    if (!prevPropsRef.current || !equals(prevPropsRef.current, props)) {
      // 3-1. props와 컴포넌트 렌더링 결과를 업데이트한다.
      prevPropsRef.current = props;
      componentRef.current = Component(props);
    }

    // 4. 컴포넌트 렌더링 결과를 반환한다.
    return componentRef.current;
  };
}
