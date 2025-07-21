import type { FunctionComponent } from "react";
import { deepEquals } from "../equals";
import { memo } from "./memo";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return memo(Component, deepEquals);
}
