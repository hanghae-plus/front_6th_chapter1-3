import { type FunctionComponent, type JSX } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

// 컴포넌트의 props를 얕은 비교하여 불필요한 렌더링을 방지하는 메모이제이션 함수
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  function MemoizedComponent(props: P) {
    // 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<JSX.Element | null>(null);

    // equals 함수를 사용하여 props 비교
    const shouldUpdate = prevPropsRef.current === null || !equals(prevPropsRef.current, props);

    // props가 변경된 경우에만 새로운 렌더링 수행
    if (shouldUpdate) {
      prevPropsRef.current = props;
      prevResultRef.current = Component(props) as JSX.Element;
    }

    return prevResultRef.current;
  }

  return MemoizedComponent;
}
