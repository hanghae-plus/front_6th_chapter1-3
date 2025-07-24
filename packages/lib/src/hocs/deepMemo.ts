import type { FunctionComponent } from "react";
import { deepEquals } from "../equals/deepEquals";
import { memo } from "./memo";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return memo(Component, deepEquals);
}
