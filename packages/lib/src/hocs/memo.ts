import { type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 렌더링을 방지
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 1. 이전 props를 저장할 ref 생성
  // 2. 메모이제이션된 컴포넌트 생성
  // 3. equals 함수를 사용하여 props 비교
  // 4. props가 변경된 경우에만 새로운 렌더링 수행

  return (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const renderOutputRef = useRef<ReactNode | null>(null);

    if (!equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      renderOutputRef.current = Component(props) as ReactNode;
    }
    return renderOutputRef.current;
  };
}
