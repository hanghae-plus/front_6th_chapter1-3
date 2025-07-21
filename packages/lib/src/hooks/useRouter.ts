import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

// 학습포인트: 리액트나 nextjs의 실제 라우터도 syncExternalStore를 사용하는지 궁금해짐 이부분에 대해서 분석해보기
// 라우터도 결국은 상태를 관리하는 것이기 때문에, 외부 저장소를 이용함
export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);

  return useSyncExternalStore(
    router.subscribe, // router의 상태 변화 구독
    () => shallowSelector(router), // router 상태에서 필요한 부분만 선택
  );
};
