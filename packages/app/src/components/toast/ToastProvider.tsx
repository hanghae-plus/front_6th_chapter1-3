import { createContext, memo, type PropsWithChildren, useCallback, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastCommandContext = createContext<{
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
  message: initialState.message,
  type: initialState.type,
});

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => {
  return useContext(ToastCommandContext);
};

export const useToastState = () => {
  return useContext(ToastStateContext);
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);

  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useCallback(
    (...args) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );

  const commandContextValue = useMemo(
    () => ({
      show: showWithHide,
      hide,
    }),
    [showWithHide, hide],
  );

  const stateContextValue = useMemo(
    () => ({
      message: state.message,
      type: state.type,
    }),
    [state.message, state.type],
  );

  return (
    <ToastCommandContext.Provider value={commandContextValue}>
      <ToastStateContext.Provider value={stateContextValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastCommandContext.Provider>
  );
});
