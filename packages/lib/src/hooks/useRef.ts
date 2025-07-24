import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T };
export function useRef<T = undefined>(): { current: T | undefined };
export function useRef<T>(initialValue?: T) {
  const [ref] = useState({ current: initialValue });
  return ref;
}
