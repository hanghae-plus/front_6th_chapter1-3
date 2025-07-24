import { useRef } from "react";
import { shallowEquals } from "../equals";

type Selector<T, S = T> = (state: T) => S;

export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  const prev = useRef<S | null>(null);

  return (state: T): S => {
    const next = selector(state);
    return shallowEquals(prev.current, next) ? (prev.current as S) : (prev.current = next);
  };
};

// zustand 참고
// export function useShallow<S, U>(selector: (state: S) => U): (state: S) => U {
//   const prev = React.useRef<U>(undefined)
//   return (state) => {
//     const next = selector(state)
//     return shallow(prev.current, next)
//       ? (prev.current as U)
//       : (prev.current = next)
//   }
// }
