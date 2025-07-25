import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [state] = useState(<{ current: T }>{ current: initialValue });

  return state;
}
