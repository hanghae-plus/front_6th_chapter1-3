/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, use, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;

type ToastState = {
  message: string;
  type: ToastType;
};

type ToastAction = {
  show: ShowToast;
  hide: () => void;
};

const ToastStateContext = createContext<ToastState>({
  ...initialState,
});

const ToastActionContext = createContext<ToastAction>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

const useToastState = () => use(ToastStateContext);
const useToastAction = () => use(ToastActionContext);

const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const commandValue = useMemo(
    () => ({
      show: showWithHide,
      hide,
    }),
    [showWithHide, hide],
  );

  const stateValue = useMemo(
    () => ({
      message: state.message,
      type: state.type,
    }),
    [state.message, state.type],
  );

  return (
    <ToastActionContext.Provider value={commandValue}>
      <ToastStateContext.Provider value={stateValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastActionContext.Provider>
  );
});

export { useToastState, useToastAction, ToastProvider };
