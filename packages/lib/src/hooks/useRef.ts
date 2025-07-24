import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // 초기값을 함수로 전달해서 한번만 실행될 수 있도록 함
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}
