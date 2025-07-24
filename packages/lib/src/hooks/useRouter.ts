import type { RouterInstance } from "../Router";
import type { AnyFunction, StringRecord } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

// Router 상태의 타입 정의
type RouterState = {
  route: (Route<AnyFunction> & { params: StringRecord; path: string }) | null;
  params: StringRecord;
  query: StringRecord;
  target: AnyFunction | undefined;
};

// Route 타입 정의 (Router.ts에서 가져옴)
interface Route<Handler extends AnyFunction> {
  regex: RegExp;
  paramNames: string[];
  handler: Handler;
  params?: StringRecord;
}

export const useRouter = <T extends RouterInstance<AnyFunction>, S>(
  router: T,
  selector = defaultSelector<RouterState, S>,
) => {
  // useShallowSelector를 사용하여 선택된 상태의 얕은 비교를 수행
  const shallowSelector = useShallowSelector(selector);

  return useSyncExternalStore(
    router.subscribe,
    () => {
      const state = {
        route: router.route,
        params: router.params,
        query: router.query,
        target: router.target,
      };
      return shallowSelector(state);
    },
    () => {
      const state = {
        route: router.route,
        params: router.params,
        query: router.query,
        target: router.target,
      };
      return shallowSelector(state);
    },
  );
};
