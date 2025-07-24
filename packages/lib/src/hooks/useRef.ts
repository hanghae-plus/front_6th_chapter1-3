import { useState } from "react";

interface MutableRefObject<T> {
  current: T;
}

export function useRef<T = undefined>(): MutableRefObject<T | undefined>;
export function useRef<T>(initialValue: T): MutableRefObject<T>;
export function useRef<T>(initialValue?: T): MutableRefObject<T | undefined> | MutableRefObject<T> {
  return useState(() => ({ current: initialValue }))[0];
}
