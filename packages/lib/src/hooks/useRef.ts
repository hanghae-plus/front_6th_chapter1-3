import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // useState의 lazy initialization을 이용
  const [ref] = useState(() => ({ current: initialValue }));

  return ref;
}
