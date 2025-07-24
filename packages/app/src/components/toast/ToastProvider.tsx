/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback } from "@hanghae-plus/lib";

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
  ...initialState,
});

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => useContext(ToastCommandContext);
export const useToastState = () => useContext(ToastStateContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const visible = state.message !== "";

  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const commandContextValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);
  const stateContextValue = useMemo(() => ({ message: state.message, type: state.type }), [state.message, state.type]);

  return (
    <ToastCommandContext.Provider value={commandContextValue}>
      <ToastStateContext.Provider value={stateContextValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastCommandContext.Provider>
  );
});
