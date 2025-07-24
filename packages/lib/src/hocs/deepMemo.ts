import { memo, type FunctionComponent } from "react";
import { deepEquals } from "../equals";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return memo<P>(Component, deepEquals);
}
