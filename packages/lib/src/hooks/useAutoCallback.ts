import type { AnyFunction } from "../types";
// import { useCallback } from "./useCallback";
// import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  return fn;
};
