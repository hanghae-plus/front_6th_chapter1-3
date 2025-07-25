import type { FunctionComponent } from "react";
import { deepEquals } from "../equals";
import { useRef } from "../hooks/useRef";
import { memo } from "./memo";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  // const MemoizedComponent = (props: P) => {
  //   const prevPropsRef = useRef<P | null>(null);
  //   const prevResultRef = useRef<ReturnType<FunctionComponent<P>> | null>(null);
  //   if (!deepEquals(prevPropsRef.current, props)) {
  //     prevPropsRef.current = props;
  //     prevResultRef.current = Component(props);
  //   }

  //   return prevResultRef.current;
  // };

  // return MemoizedComponent;
  return memo(Component, deepEquals);
}
