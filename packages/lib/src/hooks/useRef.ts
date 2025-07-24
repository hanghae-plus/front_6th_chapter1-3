import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [refObject] = useState(() => ({ current: initialValue }));

  return refObject;
}
