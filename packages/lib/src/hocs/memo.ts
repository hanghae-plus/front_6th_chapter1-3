import type { FunctionComponent, ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoziedComponent = (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);
    const componentRef = useRef<ReactNode | Promise<ReactNode>>(null);

    // 2. 메모이제이션된 컴포넌트 생성
    // 이게 지금 내가 구현한 MemoziedComponent 이 컴포 그 잡채

    // 3. equals 함수를 사용하여 props 비교
    if (prevPropsRef.current === null || !equals(prevPropsRef.current, props)) {
      // 4. props가 변경된 경우 컴포넌트 렌더링
      prevPropsRef.current = props;
      componentRef.current = Component(props);
    }

    // 5. 현재 컴포넌트 결과를 반환
    return componentRef.current;
  };

  return MemoziedComponent;
}
