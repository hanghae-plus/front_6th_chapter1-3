import type { FunctionComponent } from "react";
import { deepEquals } from "../equals";
import { useRef } from "../hooks";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  // 훅 사용을 위해 컴포넌트 생성
  const MemoizedComponent = (props: P) => {
    // 이전 프롭스와 리턴할 결과를 ref로 관리
    const prevRef = useRef<{ props: P; result: React.ReactNode | null } | null>(null);

    // 이전 프롭스와 현재 프롭스 비교
    if (!prevRef.current || !deepEquals(prevRef.current.props, props)) {
      // 프롭스가 다르면 새로 렌더링
      prevRef.current = { props, result: Component(props) as React.ReactNode };
    }
    // 프롭스가 같으면 이전 결과 재사용
    return prevRef.current.result;
  };
  return MemoizedComponent;
}
