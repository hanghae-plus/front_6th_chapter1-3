import { createObserver } from "./createObserver";
import { shallowEquals } from "./equals";

export const createStore = <S, A = (args: { type: string; payload?: unknown }) => S>(
  reducer: (state: S, action: A) => S,
  initialState: S,
) => {
  const { subscribe, notify } = createObserver();

  let state = initialState;

  const getState = () => state;

  const dispatch = (action: A) => {
    const newState = reducer(state, action);
    if (!shallowEquals(newState, state)) {
      state = newState;
      notify();
    }
  };

  return { getState, dispatch, subscribe };
};
