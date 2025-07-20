/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return Component;
}
