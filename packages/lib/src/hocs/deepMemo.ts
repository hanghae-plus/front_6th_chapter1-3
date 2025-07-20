import type { FunctionComponent } from "react";
import { deepEquals } from "../equals";
import { memo } from "./memo";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  // deepEquals 함수를 사용하여 props 비교
  // 앞에서 만든 memo를 사용
  return memo(Component, deepEquals);
}
