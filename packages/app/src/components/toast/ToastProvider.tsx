/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useMemo, useAutoCallback } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

// 불필요한 리렌더링을 방지하기 위해 상태와 명령을 각각 분리함
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

const DEFAULT_DELAY = 3000;

export const useToastState = () => useContext(ToastStateContext);
export const useToastCommand = () => useContext(ToastCommandContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  // show, hide를 useAutoCallback으로 메모이제이션
  const show = useAutoCallback((message: string, type: ToastType) => createActions(dispatch).show(message, type));
  const hide = useAutoCallback(() => createActions(dispatch).hide());
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  // 상태와 명령을 각각 분리하여 context value 생성
  const stateValue = useMemo(
    () => ({
      message: state.message,
      type: state.type,
    }),
    [state.message, state.type],
  );

  const commandValue = useMemo(
    () => ({
      show: showWithHide,
      hide,
    }),
    [showWithHide, hide],
  );

  return (
    <ToastCommandContext value={commandValue}>
      {children}
      <ToastStateContext value={stateValue}>{visible && createPortal(<Toast />, document.body)}</ToastStateContext>
    </ToastCommandContext>
  );
});
