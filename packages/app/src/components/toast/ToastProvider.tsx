/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useCallback, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastActionContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const ToastContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const DEFAULT_DELAY = 3000;

const useToastActionContext = () => useContext(ToastActionContext);
export const useToastCommand = () => {
  const { show, hide } = useToastActionContext();
  return { show, hide };
};

const useToastContext = () => useContext(ToastContext);
export const useToastState = () => {
  const { message, type } = useToastContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useCallback(
    (...args: Parameters<ShowToast>) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );

  const toastActionValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);
  const toastContextValue = useMemo(() => ({ ...state }), [state]);

  return (
    <ToastActionContext value={toastActionValue}>
      <ToastContext value={toastContextValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastContext>
    </ToastActionContext>
  );
});
