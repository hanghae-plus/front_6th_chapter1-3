import { useState } from "react";

type RefObject<T> = {
  current: T;
};

export function useRef<T>(initialValue: T) {
  // useState를 이용해서 리렌더링 간에 동일한 참조를 유지하는 ref 객체를 생성
  const [refObject] = useState<RefObject<T>>(() => ({ current: initialValue }));
  return refObject;
}
