import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // useState를 이용해서 만들어보세요.
  const [value] = useState({ current: initialValue });
  return value;
}
