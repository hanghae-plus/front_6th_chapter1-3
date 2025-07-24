import { type ComponentType } from "react";
import { deepEquals } from "../equals";
import { memo } from "./memo";

export function deepMemo<P extends object>(Component: ComponentType<P>) {
  return memo(Component, deepEquals);
}
