import { useState } from "react";

export function useRef<T>(initialValue?: T | null): { current: T | null } {
  const [ref] = useState({ current: initialValue ?? null });
  return ref;
}
