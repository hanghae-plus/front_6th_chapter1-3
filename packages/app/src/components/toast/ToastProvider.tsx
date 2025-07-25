/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastContext = createContext<{
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

export const useToastCommand = () => useContext(ToastContext);
export const useToastState = () => useContext(ToastStateContext);

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
    <ToastContext.Provider value={commandContextValue}>
      <ToastStateContext.Provider value={stateContextValue}>
        {children}
        {visible && createPortal(<MemoizedToast />, document.body)}
      </ToastStateContext.Provider>
    </ToastContext.Provider>
  );
});

// Toast는 외부 상태 변화와 무관하게 고정되도록 메모이제이션
const MemoizedToast = memo(Toast);
