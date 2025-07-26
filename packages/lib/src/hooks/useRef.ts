// useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
import { useState } from "react";
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState<{ current: T }>(() => ({ current: initialValue }));

  // useState를 이용해서 만들어보세요.
  return ref;
}
