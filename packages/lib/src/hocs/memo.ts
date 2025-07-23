import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function MemoizedComponent(props: P) {
    //이전 props(현재 props와 비교하기 위해)
    const prevPropsRef = useRef<P | null>(null);
    //이전 결과(현재 결과와 비교하기 위해)
    const prevResultRef = useRef<ReturnType<typeof Component> | null>(null);

    //이전 props와 현재 props가 다르면 새로운 결과를 반환
    if (!prevPropsRef.current || !equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      prevResultRef.current = Component(props);
    }

    return prevResultRef.current;
  };
}
