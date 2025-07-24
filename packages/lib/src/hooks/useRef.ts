import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // useState를 이용해서 만들어보세요.
  const [ref] = useState({ current: initialValue });
  return ref;
}

// export function useRef<T>(initialValue: T): { current: T } {
//   let ref = { current: initialValue };
//   return ref;
// }
