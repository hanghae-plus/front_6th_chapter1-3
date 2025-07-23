import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [refObj] = useState<{ current: T }>(() => ({ current: initialValue }));
  return refObj;
}
