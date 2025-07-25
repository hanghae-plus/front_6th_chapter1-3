import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const prevComponentRef = useRef<unknown>(null);

    // 이전 props와 현재 props 비교
    if (prevPropsRef.current && equals(prevPropsRef.current, props)) {
      // props가 같으면 이전 렌더 결과를 반환 (메모이제이션)
      return prevComponentRef.current;
    }

    // props가 다르면 새로운 렌더링
    const result = Component(props);

    prevPropsRef.current = props;
    prevComponentRef.current = result;

    return result;
  };

  return MemoizedComponent;
}
