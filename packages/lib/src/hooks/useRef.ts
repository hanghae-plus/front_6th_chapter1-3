import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T };
export function useRef<T>(initialValue: T | null): { current: T | null };
export function useRef<T = undefined>(): { current: T | undefined };
export function useRef<T>(initialValue?: T): { current: T | undefined } {
  const [ref] = useState<{ current: T | undefined }>(() => ({
    current: initialValue,
  }));

  return ref;
}
