import { type FunctionComponent, memo as reactMemo } from "react";
import { deepEquals } from "../equals";

export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  return reactMemo(Component, deepEquals);
}
