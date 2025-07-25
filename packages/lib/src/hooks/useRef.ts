import { useState } from "react";

interface MutableRefObject<T> {
  current: T;
}

/**
 * 1. DOM 요소 null 초기화 대응
 * const ref = useRef<HTMLDivElement>(null)
 *
 * 2. 초기값이 없는 경우 대응
 * const ref = useRef<string>();
 */
export function useRef<T>(initialValue: T): MutableRefObject<T>;
export function useRef<T>(initialValue: T | null): MutableRefObject<T | null>;
export function useRef<T = undefined>(): MutableRefObject<T | undefined>;

export function useRef<T>(initialValue?: T): MutableRefObject<T | undefined> {
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}
