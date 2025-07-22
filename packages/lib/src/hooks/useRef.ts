// useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // 리렌더링이 되어도 useRef의 참조값이 유지된다.
  // 렌더링 간에 ref 값을 유지하고, 값 변경 시 리렌더링을 트리거하지 않아야 한다.
  // 이 부분을 적절히 수정하세요. useRef를 구현하지 않으면 다른 hook을 구현할 수 없습니다.

  // 리액트에서는 각 컴포넌트 인스턴스마다 독립적인 메모리 공간을 관리하고, useState는 그 메모리 공간에 값을 저장해 준다
  // -> 컴포넌트마다 따로 독립적인 값을 가질 수 있는 이유
  // useState를 이용해 한 번만 객체를 만들고, 그 객체를 계속 반환하기 때문에 리렌더링이 되어도 값이 유지됨
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}
