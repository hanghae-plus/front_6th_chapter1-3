import type { FunctionComponent } from "react";
import { memo } from "./memo";
import { deepEquals } from "../equals";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return memo(Component, deepEquals);
}
