/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback } from "@hanghae-plus/lib";
type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

// 두개로 분열
const ToastActionContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({ show: () => null, hide: () => null });
const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({ ...initialState });
const DEFAULT_DELAY = 3000;

const useToastContext = () => useContext(ToastStateContext);
const useActionToastContext = () => useContext(ToastActionContext);

export const useToastCommand = () => {
  const { show, hide } = useActionToastContext();
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

  const showWithHide: ShowToast = (...args) => {
    show(...args);
    hideAfter();
  };
  const actions = useMemo(() => {
    return { show: showWithHide, hide: hide };
  }, []);

  return (
    <ToastStateContext value={{ ...state }}>
      <ToastActionContext value={actions}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastActionContext>
    </ToastStateContext>
  );
});
