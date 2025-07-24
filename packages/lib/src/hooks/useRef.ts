import { useState } from "react";

//컴포넌트가 리렌더링 되어도 값을 유지하는 방법
export function useRef<T>(initialValue: T): { current: T } {
  // useState를 이용해서 만들어보세요.
  const [refContainer] = useState<{ current: T }>({ current: initialValue });

  return refContainer;
}
