import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [currentRef] = useState({
    current: initialValue,
  });

  return currentRef;
}
