import type { FunctionComponent } from "react";
import { deepEquals } from "../equals";
import { memo } from "./memo";

// 1. 직접 구현하기
// export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
//   let prevProps: P | undefined = undefined;
//   let result: ReturnType<typeof Component> | undefined = undefined;

//   return function MemoizedComponent(props: P) {
//     if (!prevProps || !deepEquals(prevProps, props)) {
//       prevProps = props;
//       result = Component(props);
//       return result;
//     }

//     return result;
//   };
// }

// 2. memo 사용하기
export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return memo(Component, deepEquals);
}
