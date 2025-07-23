/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastActionContext = createContext<{
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

const useToastActionContext = () => useContext(ToastActionContext);
const useToastStateContext = () => useContext(ToastStateContext);

export const useToastCommand = () => {
  const { show, hide } = useToastActionContext();
  return { show, hide };
};
export const useToastState = () => {
  const { message, type } = useToastStateContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const memodedState = useMemo(() => ({ message: state.message, type: state.type }), [state.message, state.type]);
  const memoedAction = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastActionContext.Provider value={memoedAction}>
      <ToastStateContext.Provider value={memodedState}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastActionContext.Provider>
  );
});
