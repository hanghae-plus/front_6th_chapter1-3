/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

// 상태 컨텍스트
const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

// 액션 컨텍스트
const ToastActionContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => useContext(ToastActionContext);
export const useToastState = () => useContext(ToastStateContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  // 메모이제이션 처리
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";

  // 메모이제이션 처리
  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  // 메모이제이션 처리
  const showWithHide: ShowToast = useCallback(
    (...args) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );

  // 상태만 메모이제이션 처리
  const memoizedStateValue = useMemo(() => ({ message: state.message, type: state.type }), [state.message, state.type]);

  // 액션만 메모이제이션 처리
  const memoizedActionValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastStateContext.Provider value={memoizedStateValue}>
      <ToastActionContext.Provider value={memoizedActionValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastActionContext.Provider>
    </ToastStateContext.Provider>
  );
});
