import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const cachedResultRef = useRef<ReturnType<FunctionComponent<P>> | null>(null);

    // 첫 번째 렌더링이거나 props가 변경된 경우
    const shouldUpdate = prevPropsRef.current === null || !equals(prevPropsRef.current, props);

    if (shouldUpdate) {
      // 새로 컴포넌트 실행하여 결과 캐싱
      cachedResultRef.current = Component(props);
      prevPropsRef.current = props;
    }

    // 캐싱된 결과 반환
    return cachedResultRef.current!;
  };

  return MemoizedComponent;
}
