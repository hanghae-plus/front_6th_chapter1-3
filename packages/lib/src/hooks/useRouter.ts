import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * router의 상태를 구독하고 선택된 값을 반환하는 Hook입니다.
 *
 * @template T RouterInstance의 타입
 * @template S selector 결과의 타입
 * @param router Router 인스턴스
 * @param selector router에서 값을 선택하는 함수 (기본: 전체 router)
 * @returns 선택된 router 상태 값
 */
export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);

  return useSyncExternalStore(
    router.subscribe, // 구독 등록
    () => shallowSelector(router), // 현재 경로 반환
  );
};
