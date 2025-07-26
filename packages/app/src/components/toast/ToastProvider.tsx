/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const DEFAULT_DELAY = 3000;

const useToastContext = () => useContext(ToastContext);
const useToastStateContext = () => useContext(ToastStateContext);

export const useToastCommand = () => {
  const { show, hide } = useToastContext();
  return { show: useAutoCallback(show), hide: useAutoCallback(hide) };
};
export const useToastState = () => {
  const { message, type } = useToastStateContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = createActions(dispatch);
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useAutoCallback((message, type) => {
    show(message, type);
    hideAfter();
  });

  const [value] = useState(() => ({
    show: showWithHide,
    hide,
  }));

  return (
    <ToastContext.Provider value={value}>
      <ToastStateContext.Provider value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastContext.Provider>
  );
});
