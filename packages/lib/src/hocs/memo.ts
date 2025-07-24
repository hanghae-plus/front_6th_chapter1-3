import { createElement, type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks/useRef";

/**
 * memo HOC: 전달받은 컴포넌트를 props가 변경될 때만 리렌더링하는 고차 컴포넌트(HOC)를 반환합니다.
 * @param Component - 메모이제이션할 함수형 컴포넌트
 * @param equals - 이전 props와 현재 props를 비교하는 함수(기본값: shallowEquals)
 */
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // MemoizedComponent: props가 변경되지 않으면 이전 렌더 결과를 재사용하는 컴포넌트
  return function MemoizedComponent(props: P) {
    // 이전 props를 저장하는 ref (컴포넌트가 리렌더링되어도 값이 유지됨)
    const prevProps = useRef<P | null>(null);
    // 이전에 렌더링된 컴포넌트 결과를 저장하는 ref
    const prevComponent = useRef<React.ReactNode | null>(null);

    // prevProps.current가 존재하고, 이전 props와 현재 props가 같으면
    if (prevProps.current && equals(prevProps.current, props)) {
      // 이전에 렌더링된 컴포넌트 결과를 그대로 반환 (리렌더링 방지)
      return prevComponent.current!;
    }

    // props가 변경된 경우, 현재 props와 컴포넌트 결과를 ref에 저장
    prevProps.current = props;
    prevComponent.current = createElement(Component, props);

    // 새로 렌더링된 컴포넌트 결과 반환
    return prevComponent.current! as React.ReactElement;
  };
}
