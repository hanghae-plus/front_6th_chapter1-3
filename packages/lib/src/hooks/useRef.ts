// useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // 리렌더링이 되어도 useRef의 참조값이 유지된다.
  // 렌더링 간에 ref 값을 유지하고, 값 변경 시 리렌더링을 트리거하지 않아야 한다.
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}
