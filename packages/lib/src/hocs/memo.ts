import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

// props로 전달하는 값이 변경되어야 리렌더링
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoComponent = (props: P) => {
    const componentRef = useRef<React.ReactNode | Promise<React.ReactNode> | null>(null);
    const propsRef = useRef<P | null>(null);

    // 최초 렌더링이거나 props 값이 바뀜
    if (!componentRef.current || !equals(propsRef.current, props)) {
      const newComponent = Component(props);

      componentRef.current = newComponent;
      propsRef.current = props;

      return newComponent;
    }

    return componentRef.current;
  };

  return MemoComponent;
}
