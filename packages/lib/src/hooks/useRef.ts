import { useState } from "react";

/**
 * 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성
 * - 반환된 ref 객체는 컴포넌트의 전체 생명주기 동안 유지됩니다.
 * - ref 객체의 .current 속성을 변경해도 리렌더링이 트리거되지 않습니다.
 * - DOM 요소에 접근하거나 이전 상태를 저장하는 등 다양한 용도로 사용될 수 있습니다.
 * @param initialValue 초기값
 * @returns ref 객체
 */

export function useRef<T>(initialValue: T): { current: T } {
  //useState를 사용하여 초기값을 저장하고, 이후 값을 변경할 때 리렌더링을 트리거하지 않도록 합니다.
  const [refObject] = useState(() => ({ current: initialValue }));
  return refObject;
}
