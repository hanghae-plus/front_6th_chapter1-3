import { type ActionDispatch } from "react";
import { useCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

export type ToastType = "info" | "success" | "warning" | "error";

export const Actions = {
  // 알림
  SHOW: "show",
  HIDE: "hide",
} as const;

export const initialState = {
  message: "",
  type: "info" as ToastType,
};

export type ToastState = typeof initialState;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toastReducer = (state: ToastState, action: any): ToastState => {
  switch (action.type) {
    case Actions.HIDE:
      return { ...initialState };

    case Actions.SHOW:
      return {
        message: action.payload.message,
        type: action.payload.type ?? "info",
      };

    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useToastActions = (dispatch: ActionDispatch<[action: any]>) => {
  const show = useCallback(
    (message: string, type: ToastType) => dispatch({ type: Actions.SHOW, payload: { message, type } }),
    [dispatch],
  );

  const hide = useCallback(() => dispatch({ type: Actions.HIDE }), [dispatch]);

  return useMemo(() => ({ show, hide }), [show, hide]);
};
