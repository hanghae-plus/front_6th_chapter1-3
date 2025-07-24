import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";
import { deepEquals } from "../equals";
import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  const routerState = useSyncExternalStoreWithSelector(
    router.subscribe,
    () => {
      //클래스 인스턴스를 그대로 전달할 경우 getSnapshot에서 변경했다고 인식을 못함
      return {
        ...router,
        route: router.route,
        params: router.params,
        query: router.query,
        target: router.target,
      };
    },
    () => {
      return {
        ...router,
        route: router.route,
        params: router.params,
        query: router.query,
        target: router.target,
      };
    },
    selector,
    deepEquals,
  );

  return routerState;
};
