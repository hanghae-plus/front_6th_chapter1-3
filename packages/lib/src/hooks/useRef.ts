import { useState } from "react";

/**
 * 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
 *
 * @param initialValue - ref 객체의 초기값 (모든 타입 허용)
 * @returns current 속성을 가진 가변 객체 ({ current: T })
 */
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}
