import { useState } from "react";

/**
 * 참조 값을 관리하는 훅
 * @param initialValue 초기 값
 * @returns 참조 값
 */
export function useRef<T>(initialValue: T): { current: T } {
  // useState의 지연 초기화 기능을 활용
  const [ref] = useState<{ current: T }>(() => ({ current: initialValue }));

  return ref;
}
