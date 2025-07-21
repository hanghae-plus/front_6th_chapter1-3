import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // useState를 이용해서 만들어보세요.
  // https://github.com/JiHoon-0330/front_6th_chapter1-3/issues/5
  const [value] = useState({ current: initialValue });
  return value;
}
