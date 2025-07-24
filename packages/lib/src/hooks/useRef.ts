import { useState } from "react";

/**
 * @param initialValue 초기 값
 * @description useState의 lazy initialization을 사용하여 초기 렌더링에서만 ref 객체를 생성하고, 이후에는 같은 참조를 유지
 * @returns 참조 객체
 */
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}
