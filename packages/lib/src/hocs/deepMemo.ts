import type { FunctionComponent } from "react";
import { deepEquals } from "../equals";
import { memo } from "./memo";
export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  // 이건 그냥 비교방식만 바꾸면 된다고 생각해서 인자를 deepEqauls를 넣어줬습니다.
  return memo(Component, deepEquals);
}
