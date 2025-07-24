/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, type PropsWithChildren } from "react";
import { useAutoCallback, useMemo } from "@hanghae-plus/lib";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

// 명령 context: show/hide만 제공
const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

// 상태 context: message/type만 제공
const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => useContext(ToastCommandContext);
export const useToastState = () => useContext(ToastStateContext);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const show = useAutoCallback((...args: Parameters<ShowToast>) => createActions(dispatch).show(...args));
  const hide = useAutoCallback(() => createActions(dispatch).hide());
  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);
  const showWithHide: ShowToast = useAutoCallback((...args: Parameters<ShowToast>) => {
    show(...args);
    hideAfter();
  });

  // 명령 context value
  const commandValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);
  // 상태 context value
  const stateValue = useMemo(() => ({ message: state.message, type: state.type }), [state.message, state.type]);

  return (
    <ToastCommandContext.Provider value={commandValue}>
      <ToastStateContext.Provider value={stateValue}>
        {children}
        {state.message !== "" && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastCommandContext.Provider>
  );
};
