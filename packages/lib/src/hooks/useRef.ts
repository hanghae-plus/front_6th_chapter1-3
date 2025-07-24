import { useState } from "react";

type Ref<T> = { current: T };

export function useRef<T>(initialValue: T | null): Ref<T | null> {
  const [ref] = useState<Ref<T | null>>(() => ({
    current: initialValue,
  }));

  return ref;
}
