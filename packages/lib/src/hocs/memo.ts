import { type ComponentType, createElement } from "react";

import { shallowEquals } from "../equals";

/**
 * 컴포넌트의 props를 비교하여 불필요한 리렌더링을 방지하는 HOC
 * @param Component 메모이제이션할 컴포넌트
 * @param equals props를 비교할 함수 (기본값: shallowEquals)
 * @returns 메모이제이션된 컴포넌트
 * @example
 * const MemoizedComponent = memo(MyComponent);
 * const MemoizedWithCustomEquals = memo(MyComponent, customEquals);
 */
export function memo<P extends object>(Component: ComponentType<P>, _equals = shallowEquals): ComponentType<P> {
  // 1. 이전 props를 저장할 ref 생성
  // 2. 메모이제이션된 컴포넌트 생성
  let prevProps: P | null = null;
  let memoizedElement: ReturnType<typeof createElement> | null = null;

  const MemoizedComponent = function (props: P) {
    // 3. equals 함수를 사용하여 props 비교
    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    if (!prevProps || !_equals(prevProps, props)) {
      prevProps = props;
      memoizedElement = createElement(Component, props);
    }

    return memoizedElement;
  };

  return MemoizedComponent;
}
