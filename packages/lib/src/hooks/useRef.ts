import { useState } from "react";

/**
 * useRef - 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
 *
 * 특징:
 * - current 프로퍼티는 직접 수정 가능하며, 수정해도 리렌더링이 발생하지 않음
 * - useState와 달리 값 변경 시 컴포넌트가 다시 렌더링되지 않음
 *
 * 사용 사례:
 * - DOM 요소 참조
 * - 이전 state 값 기억
 * - 타이머 ID 저장 (setInterval, setTimeout)
 * - 리렌더링 없이 값을 유지해야 하는 경우
 * - 함수 참조 유지
 */

export function useRef<T>(initialValue: T): { current: T } {
  const [refObject] = useState(() => ({ current: initialValue }));

  return refObject;
}
