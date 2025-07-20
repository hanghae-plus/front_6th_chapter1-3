import { type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 1. 이전 props를 저장할 ref 생성
  // 2. 메모이제이션된 컴포넌트 생성
  // 3. equals 함수를 사용하여 props 비교
  // 4. props가 변경된 경우에만 새로운 렌더링 수행
  const MemoizedComponent = (currentProps: P) => {
    const prevProps = useRef<P | null>(null); // 이전 프롭스들
    const prevResult = useRef<ReactNode | Promise<ReactNode> | null>(null); // 이전 렌더링 결과

    if (!equals(prevProps.current, currentProps)) {
      // props가 변경되었을 때 -> 새로 값 부여
      const currentResult = Component(currentProps);
      prevProps.current = currentProps;
      prevResult.current = currentResult;
      return currentResult;
    } else {
      // props가 그대로일 때 -> 이전 result를 리턴
      return prevResult.current!;
    }
  };

  return MemoizedComponent;
}
