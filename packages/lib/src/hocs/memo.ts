import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function (props: P) {
    const prevProps = useRef<P | null>(null);
    const prevRendered = useRef<ReturnType<typeof Component> | null>(null);

    // 항상 Component(props) 호출
    const rendered = Component(props);

    if (prevProps.current !== null && equals(prevProps.current, props)) {
      // props가 같으면 이전 결과 반환
      return prevRendered.current;
    }

    // props가 다르면 새로 렌더링 결과 저장
    prevProps.current = props;
    prevRendered.current = rendered;
    return rendered;
  };
}
