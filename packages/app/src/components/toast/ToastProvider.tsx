/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback } from "@hanghae-plus/lib";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

const useToastContext = () => useContext(ToastContext);
const useToastCommandContext = () => useContext(ToastCommandContext);

export const useToastCommand = () => {
  const { show, hide } = useToastCommandContext();
  return { show, hide };
};
export const useToastState = () => {
  const { message, type } = useToastContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = createActions(dispatch);
  const visible = state.message !== "";

  const hideAfter = debounce(hide, DEFAULT_DELAY);

  const showWithHide: ShowToast = useAutoCallback((message: string, type: ToastType) => {
    hideAfter();
    show(message, type);
  });

  const hideCallback = useAutoCallback(hide);

  const commandContextValue = useMemo(() => {
    return {
      show: showWithHide,
      hide: hideCallback,
    };
  }, [hideCallback, showWithHide]);

  return (
    <ToastCommandContext.Provider value={commandContextValue}>
      <ToastContext.Provider value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastContext.Provider>
    </ToastCommandContext.Provider>
  );
});
