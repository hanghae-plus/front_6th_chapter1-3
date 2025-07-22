import { type FunctionComponent, type JSX } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

/**
 * memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
 * @param Component 메모이제이션할 컴포넌트
 * @param equals 비교 함수
 * @returns 메모이제이션된 컴포넌트
 */
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P) => {
    // Hook을 컴포넌트 내부에서 호출
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<JSX.Element | null>(null);

    const shouldUpdate = prevPropsRef.current === null || !equals(prevPropsRef.current, props);

    if (shouldUpdate) {
      prevPropsRef.current = props;
      prevResultRef.current = Component(props) as JSX.Element;
    }

    return prevResultRef.current!;
  };

  return MemoizedComponent;
}
