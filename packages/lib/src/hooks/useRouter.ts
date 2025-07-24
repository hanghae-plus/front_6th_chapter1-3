import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

/**
 * useRouter - 라우터 상태를 구독하고 선택적으로 데이터를 추출하는 훅입니다.
 *
 * 특징:
 * - useSyncExternalStore를 사용하여 라우터 상태 변경을 감지
 * - selector를 통해 필요한 데이터만 선택적으로 추출 가능
 * - shallow comparison을 통한 최적화된 리렌더링
 *
 * @param router 구독할 라우터 인스턴스
 * @param selector 상태에서 필요한 값을 선택하는 함수 (기본값: 전체 상태 반환)
 * @returns 선택된 라우터 상태
 */

export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);
  const state = useSyncExternalStore(router.subscribe, () => shallowSelector(router));
  return state;
};
