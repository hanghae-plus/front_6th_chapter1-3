/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastContentContext = createContext<{
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

const useToastContentContext = () => useContext(ToastContentContext);
const useToastActionContext = () => useContext(ToastActionContext);

export const useToastCommand = () => {
  const { show, hide } = useToastActionContext();
  return { show, hide };
};
export const useToastState = () => {
  const { message, type } = useToastContentContext();
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

  const memoizedState = useMemo(() => state, [state]);
  const memoizedAction = useMemo(() => ({ show: showWithHide, hide }), []);

  return (
    <ToastActionContext.Provider value={memoizedAction}>
      <ToastContentContext.Provider value={memoizedState}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastContentContext.Provider>
    </ToastActionContext.Provider>
  );
});
