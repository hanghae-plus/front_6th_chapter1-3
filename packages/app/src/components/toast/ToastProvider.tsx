/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";

import { useMemo, useAutoCallback } from "@hanghae-plus/lib/src/hooks";

import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const ToastActionContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

const useToastStateContext = () => useContext(ToastStateContext);
const useToastActionContext = () => useContext(ToastActionContext);

export const useToastState = () => {
  const { message, type } = useToastStateContext();
  return { message, type };
};

export const useToastCommand = () => {
  const { show, hide } = useToastActionContext();
  return { show, hide };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);

  const visible = useMemo(() => state.message !== "", [state.message]);

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const ToastStateContextValue = useMemo(
    () => ({ message: state.message, type: state.type }),
    [state.message, state.type],
  );
  const toastActionContextValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastActionContext.Provider value={toastActionContextValue}>
      <ToastStateContext.Provider value={ToastStateContextValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastActionContext.Provider>
  );
});
