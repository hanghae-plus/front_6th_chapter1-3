import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * 외부 router 인스턴스의 상태를 구독하고 선택된 상태(slice)를 반환하는 커스텀 훅입니다.
 *
 * - useSyncExternalStore를 사용하여 router의 상태 변경을 구독합니다.
 * - 선택자(selector)를 통해 필요한 부분만 선택하고, useShallowSelector로 얕은 비교를 통해 불필요한 리렌더링을 방지합니다.
 *
 * @template T Router 인스턴스의 타입
 * @template S 선택된 상태(slice)의 타입 (기본값은 전체 router 인스턴스)
 *
 * @param router 상태를 보관하는 외부 router 객체
 * @param selector 상태 중 필요한 부분을 선택하는 함수 (기본값은 전체 router 반환)
 * @returns 선택된 상태(slice)
 */
export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  // useSyncExternalStore를 사용하여 router의 상태를 구독하고 가져오는 훅을 구현합니다.
  const shallowSelector = useShallowSelector(selector);

  const slice = useSyncExternalStore(
    router.subscribe,
    () => shallowSelector(router),
    () => selector(router),
  );

  return slice;
};
