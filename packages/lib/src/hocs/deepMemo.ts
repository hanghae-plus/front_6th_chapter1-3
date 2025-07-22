import type { FunctionComponent } from "react";
import { deepEquals } from "../equals";
// import { ComponentType } from "react";
import { memo } from "./memo.ts";

// deepMemo HOC는 컴포넌트의 props를 깊은 비교하여 불필요한 리렌더링을 방지합니다.
// FunctionComponent: 함수형 컴포넌트만 type FunctionComponent<P = {}> = (props: P) => ReactElement | null;
// ComponentType: 함수형 + 클래스형 컴포넌트 모두 type ComponentType<P = {}> = FunctionComponent<P> | ComponentClass<P>;
// ? 요구사항 복붙하니까 되었다 왜..?
export function deepMemo<P extends object>(Component: FunctionComponent<P>) {
  // Component : 첫번째 인자 그대로 전달 / deepEquals : 두번째 인자 shallowEquals 대신 사용

  // 테스트 조건
  // props로 전달하는 값이 모두 변경되어야 리렌더링 된다.
  // 깊은 객체 비교를 수행해야 한다.
  // 깊은 배열 비교를 수행해야 한다.
  // deepEquals 함수를 사용하여 props 비교
  // 앞에서 만든 memo를 사용
  return memo(Component, deepEquals);
}
