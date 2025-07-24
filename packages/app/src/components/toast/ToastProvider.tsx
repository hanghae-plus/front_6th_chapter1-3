/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

const useToastStateContext = () => useContext(ToastStateContext);
const useToastCommandContext = () => useContext(ToastCommandContext);

export const useToastCommand = () => {
  const { show, hide } = useToastCommandContext();
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

  const stateContextValue = useMemo(() => ({ ...state }), [state]);
  const actionContextValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastStateContext.Provider value={stateContextValue}>
      <ToastCommandContext.Provider value={actionContextValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastCommandContext.Provider>
    </ToastStateContext.Provider>
  );
});
