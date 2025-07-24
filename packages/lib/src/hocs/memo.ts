import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 새로운 컴포넌트 정의, 렌더링 할 때 props 넘겨줌.
  const memoizedComponent: FunctionComponent<P> = (props) => {
    const cache = useRef<{ preProps: P; result: React.ReactElement } | null>(null);
    // 최초 렌더링 또는 props 변경 시 컴포넌트 호출하여 렌더링 값 설정
    if (cache.current === null || !equals(cache.current.preProps, props)) {
      const newResult = Component(props);
      cache.current = { preProps: props, result: newResult };
    }
    return cache.current.result;
  };
  return memoizedComponent;
}
