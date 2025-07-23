import { createObserver } from "./createObserver";

export const createStore = <S, A = (args: { type: string; payload?: unknown }) => S>(
  reducer: (state: S, action: A) => S,
  initialState: S,
) => {
  const { subscribe, unsubscribe, notify } = createObserver();

  let state = initialState;

  const getState = () => state;

  const dispatch = (action: A) => {
    const newState = reducer(state, action);
    if (!Object.is(newState, state)) {
      state = newState;
      notify();
    }
  };

  return { getState, dispatch, subscribe, unsubscribe };
};
