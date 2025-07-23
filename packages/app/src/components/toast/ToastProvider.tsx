/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useCallback, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { Actions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>(initialState);

const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const useToastStateContext = () => useContext(ToastStateContext);
const useToastCommandContext = () => useContext(ToastCommandContext);

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => {
  const { show, hide } = useToastCommandContext();
  return { show, hide };
};

export const useToastState = () => {
  const { message, type } = useToastStateContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const visible = state.message !== "";

  const show = useCallback((message: string, type: ToastType) => {
    dispatch({ type: Actions.SHOW, payload: { message, type } });
  }, []);

  const hide = useCallback(() => {
    dispatch({ type: Actions.HIDE });
  }, []);

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useCallback(
    (...args) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );

  const command = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastCommandContext value={command}>
      {children}
      <ToastStateContext value={state}>{visible && createPortal(<Toast />, document.body)}</ToastStateContext>
    </ToastCommandContext>
  );
});
