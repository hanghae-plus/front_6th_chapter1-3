/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

// https://ko.react.dev/reference/react/useCallback
//**useCallback은 메모이제이션된 콜백 함수를 반환하는 Hook**입니다. 이는 불필요한 렌더링을 방지하고 성능을 최적화하는 데 사용됩니다.
// - 의존성 배열이 변경되지 않는 한, 동일한 함수 참조를 유지합니다.
// - 주로 자식 컴포넌트에 콜백을 전달할 때 사용됩니다.
// - React.memo와 함께 사용하여 컴포넌트의 불필요한 리렌더링을 방지할 수 있습니다.
// 정신 차리고 나서 한번 더 봐야 할 곳
export function useCallback<T extends Function>(factory: T, deps: DependencyList): T {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  return useMemo(() => factory, deps);
}
