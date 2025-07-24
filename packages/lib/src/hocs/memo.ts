import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return function MemoizedComponent(props: P) {
    // 1. 이전 props와 결과 저장 (커스텀 useRef 사용)
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<ReturnType<typeof Component> | null>(null);

    // 2. props가 변경됐는지 비교
    const isSame = prevPropsRef.current !== null && equals(prevPropsRef.current, props);

    if (!isSame) {
      // 3. 변경된 경우: 새로 렌더링
      prevPropsRef.current = props;
      prevResultRef.current = Component(props);
    }

    // 4. 변경되지 않은 경우: 이전 결과 재사용
    return prevResultRef.current;
  };
}
