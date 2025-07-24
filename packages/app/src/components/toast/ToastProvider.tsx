/* eslint-disable react-refresh/only-export-components */

import { useAutoCallback } from "@hanghae-plus/lib";
import { createContext, memo, type PropsWithChildren, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";

import { debounce } from "../../utils";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";

type ToastCommandContextValue = {
  hide: () => void;
  show: (message: string, type: ToastType) => void;
};

type ToastStateContextValue = {
  message: string;
  type: ToastType;
};

const ToastCommandContext = createContext<ToastCommandContextValue>({
  show: () => null,
  hide: () => null,
});

const ToastStateContext = createContext<ToastStateContextValue>({
  ...initialState,
});

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => {
  const context = useContext(ToastCommandContext);
  if (!context) {
    throw new Error("ToastProvider 내에서 useToastCommand을 사용해야 합니다!");
  }

  return context;
};

export const useToastState = () => {
  const context = useContext(ToastStateContext);
  if (!context) {
    throw new Error("ToastProvider 내에서 useToastState을 사용해야 합니다!");
  }

  return context;
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const visible = state.message !== "";

  const showWithHide = useAutoCallback((message: string, type: ToastType) => {
    show(message, type);
    hideAfter();
  });

  const toastCommandContextValue: ToastCommandContextValue = useMemo(
    () => ({
      hide,
      show: showWithHide,
    }),
    [hide, showWithHide],
  );

  const toastStateContextValue: ToastStateContextValue = useMemo(
    () => ({
      message: state.message,
      type: state.type,
    }),
    [state.message, state.type],
  );

  return (
    <ToastCommandContext.Provider value={toastCommandContextValue}>
      <ToastStateContext.Provider value={toastStateContextValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastCommandContext.Provider>
  );
});
