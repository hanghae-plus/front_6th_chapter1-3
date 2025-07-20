// useRef 혹인 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
// 리액트의 컴포넌트는 state가 변경되거나 props가 바뀔 때마다 다시 렌더링 된다
// 이때 함수 컴포넌트는 처음부터 끝까지 다시 실행
// let someValue = 0; <- 매번 렌더 될 때마다 0으로 초기화됨
// useState로 만든 state는 불변. 값을 바꾸려면 setState를 호출해야 하고, 이건 리랜더링을 일으킴
// useRef의 current 프로퍼티는 직접 수정할 수 있고, 수정해도 리렌더링이 일어나지 않다.
// DOM Element 참조 외에, 이전 state값을 기억하고 싶을 때, setInterval, setTimeout 등 ID 저장해서 나중에 clear 할 때
// 리렌더링을 일으키지 않으면서 값을 계속 유지하고 싶을 때, 함수와 참조 유지할 때

import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // useState를 이용해서 만들어보세요.
  // 리액트에서는 각 컴포넌트 인스턴스마다 독립적인 메모리 공간을 관리하고, useState는 그 메모리 공간에 값을 저장해 준다 -> 컴포넌트마다 따로 독립적인 값을 가질 수 있는 이유
  // 리랜더링할 때마다 초기화로 변경되지 않고, 다른 컴포넌트와도 값이 공유되지 않아서
  // 이런 점을 이용해 useRef를 구현할 수 있다!
  const [refObject] = useState(() => ({ current: initialValue }));

  return refObject;
}
