import type { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equals";

type EffectCallback = () => void | (() => void);

export function useEffect(effect: EffectCallback, deps?: DependencyList): void {
  const prevDepsRef = useRef<DependencyList | undefined>(undefined);
  const cleanupRef = useRef<(() => void) | void>(undefined);
  const isFirstRenderRef = useRef<boolean>(true);

  const depsChanged =
    deps === undefined || prevDepsRef.current === undefined || !shallowEquals(prevDepsRef.current, deps);

  if (isFirstRenderRef.current || depsChanged) {
    if (cleanupRef.current && typeof cleanupRef.current === "function") {
      cleanupRef.current();
    }

    const cleanup = effect();
    cleanupRef.current = cleanup;

    prevDepsRef.current = deps;
    isFirstRenderRef.current = false;
  }
}
