import type { DependencyList } from "react";
import { shallowEquals } from "../equals";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  return factory();
}
