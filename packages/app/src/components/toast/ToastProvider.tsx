import { useCallback, useMemo } from "@hanghae-plus/lib/src/hooks";
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { debounce } from "../../utils";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastContext = createContext<{
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

export const useToastCommand = () => useContext(ToastActionContext);
export const useToastState = () => useContext(ToastContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  console.log("[ToastProvider] 렌더링");
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

  const value = useMemo(
    () => ({
      message: state.message,
      type: state.type,
    }),
    [state.message, state.type],
  );
  const action = useMemo(
    () => ({
      show: showWithHide,
      hide,
    }),
    [showWithHide, hide],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastActionContext.Provider value={action}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastActionContext.Provider>
    </ToastContext.Provider>
  );
});
