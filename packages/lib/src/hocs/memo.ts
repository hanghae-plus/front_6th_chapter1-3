import { type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return (props: P) => {
    // 초기 값 설정
    const prevPropsRef = useRef<P | null>(null);
    const componentRef = useRef<ReactNode | Promise<ReactNode> | null>(null);

    // 최초 렌더이거나, 이전 props값과 현재 props 값이 다른가요?
    if (prevPropsRef.current === null || !equals(prevPropsRef.current, props)) {
      // props가 변경되었다면 컴포넌트를 업데이트합니다.
      componentRef.current = Component(props);
      prevPropsRef.current = props;
    }

    return componentRef.current;
  };
}
