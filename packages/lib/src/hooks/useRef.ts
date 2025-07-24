import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // 리렌더링을 발생시키지 않는 이유: useState는 초기화 시에만 객체를 생성하고 이후 리렌더링에서는 동일한 객체 참조를 반환한다,
  // useState의 setter를 호출하지 않는 한 리렌더링이 발생하지 않는다.
  // React는 객체 내부 프로퍼티 변화(current의 변화)를 감지하지 못한다 (얕은 비교!)
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}
