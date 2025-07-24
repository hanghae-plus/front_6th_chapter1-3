import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [refObejct] = useState(() => ({
    current: initialValue,
  }));

  return refObejct;
}
