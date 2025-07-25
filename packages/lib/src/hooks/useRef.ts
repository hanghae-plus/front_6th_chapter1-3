import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  //반환 타입이 {current : T}
  /**
   * useState를 사용하여 초기값을 가진 ref object을 생성
   * ref.current 값을 직접 바꿔도 리렌더링 되지 않음
   **/
  const [ref] = useState<{ current: T }>({ current: initialValue });
  return ref;
}
