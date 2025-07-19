/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { useAutoCallback } from "@hanghae-plus/lib";
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

const ToastStateContext = createContext({ ...initialState });

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => useContext(ToastCommandContext);
export const useToastState = () => useContext(ToastStateContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const actions = createActions(dispatch);
  const visible = state.message !== "";

  const hide = useAutoCallback(actions.hide);
  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);
  const show = useAutoCallback(actions.show);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const commandValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastCommandContext value={commandValue}>
      <ToastStateContext value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastCommandContext>
  );
});
