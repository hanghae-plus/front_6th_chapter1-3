/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;
// Context 분리
// 상태 Context
const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({ ...initialState });
// 이벤트 Context
const ToastCommandContext = createContext<{ show: ShowToast; hide: Hide }>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;
// Hook 수정
export const useToastCommand = () => useContext(ToastCommandContext);
export const useToastState = () => useContext(ToastStateContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";
  // 메모이제이션
  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);
  // 메모이제이션
  const showWithHide: ShowToast = useCallback(
    (...args) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );
  // props 로 넘길 값 (메모이제이션)
  const commandValue = useMemo(
    () => ({
      show: showWithHide,
      hide: hide,
    }),
    [showWithHide, hide],
  );
  return (
    // Provider 중첩
    <ToastCommandContext.Provider value={commandValue}>
      <ToastStateContext.Provider value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastCommandContext.Provider>
  );
});
