import type { FunctionComponent } from "react";
import { memo } from "./memo";
import { deepEquals } from "../equals";

// props의 값이 보두 변경되어야 리렌더링
// 객체, 배열의 깊은 비교
export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return memo(Component, deepEquals);
}
