import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prevResultRef = useRef<S | undefined>(undefined);

  return (state: T): S => {
    // 항상 selector를 실행해서 새로운 결과를 계산
    const newResult = selector(state);

    // 이전 결과와 shallow 비교
    if (prevResultRef.current !== undefined && shallowEquals(prevResultRef.current, newResult)) {
      // 결과가 같으면 이전 참조를 반환 (참조 동일성 유지)
      return prevResultRef.current;
    }

    // 새로운 결과를 캐시하고 반환
    prevResultRef.current = newResult;
    return newResult;
  };
};

// export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
//   const cache = useRef<{
//     selector: Selector<T, S>;
//     lastState: T;
//     lastResult: S;
//   } | null>(null);

//   return (state: T): S => {
//     const currentCache = cache.current;

//     // 캐시가 있고 selector와 state가 모두 같다면 캐시된 결과 반환
//     if (currentCache && currentCache.selector === selector && Object.is(currentCache.lastState, state)) {
//       return currentCache.lastResult;
//     }

//     // 새로운 결과 계산
//     const newResult = selector(state);

//     // 이전 결과와 shallow 비교
//     if (currentCache && shallowEquals(currentCache.lastResult, newResult)) {
//       // 결과가 같으면 캐시 업데이트하고 이전 참조 반환
//       cache.current = {
//         selector,
//         lastState: state,
//         lastResult: currentCache.lastResult, // 이전 참조 유지!
//       };
//       return currentCache.lastResult;
//     }

//     // 새로운 결과를 캐시하고 반환
//     cache.current = {
//       selector,
//       lastState: state,
//       lastResult: newResult,
//     };
//     return newResult;
//   };
// };

// export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
//   const prevResultRef = useRef<S | undefined>(undefined);

//   return (state: T): S => {
//     // 항상 selector를 실행해서 새로운 결과를 계산
//     const newResult = selector(state);

//     // 이전 결과와 shallow 비교
//     if (prevResultRef.current !== undefined && shallowEquals(prevResultRef.current, newResult)) {
//       // 결과가 같으면 이전 참조를 반환 (참조 동일성 유지)
//       return prevResultRef.current;
//     }

//     // 새로운 결과를 캐시하고 반환
//     prevResultRef.current = newResult;
//     return newResult;
//   };
// };

// export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
//   const cache = useRef<{ state: T; result: S } | null>(null);

//   return (state: T): S => {
//     if (cache.current && shallowEquals(cache.current.state, state)) {
//       return cache.current.result;
//     }

//     const newResult = selector(state);

//     if (cache.current && shallowEquals(cache.current.result, newResult)) {
//       return cache.current.result;
//     }

//     cache.current = { state, result: newResult };
//     return newResult;
//   };
// };
