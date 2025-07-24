/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

export const ToastActionContext = createContext<{
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

export const useToastCommand = () => {
  const { show, hide } = useContext(ToastActionContext);
  return { show, hide };
};
export const useToastState = () => {
  const { message, type } = useContext(ToastStateContext);
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = useMemo(() => state.message !== "", [state.message]);

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  // showWithHide 함수를 useCallback으로 메모이제이션
  const showWithHide: ShowToast = useCallback((...args) => {
    show(...args);
    hideAfter();
  }, []);

  const memoedAction = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastActionContext value={memoedAction}>
      <ToastStateContext value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastActionContext>
  );
});
