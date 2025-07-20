import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // useState를 이용해서 만들어보세요.
  // 리렌더 시 값을 유지하면서도 불변성 유지하지 못하게 set함수 대신 직접 초기화 하도록 구현됨.
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}
