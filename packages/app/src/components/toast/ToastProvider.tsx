/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback } from "@hanghae-plus/lib";
import { useMemo, useRef } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

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

export const useToastCommand = () => {
  const { show, hide } = useContext(ToastCommandContext);
  return { show: useAutoCallback(show), hide: useAutoCallback(hide) };
};
export const useToastState = () => {
  const { message, type } = useContext(ToastStateContext);
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useRef(createActions(dispatch)).current;
  const visible = state.message !== "";

  const hideAfter = debounce(hide, DEFAULT_DELAY);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const memorizedCommand = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastCommandContext value={memorizedCommand}>
      <ToastStateContext value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastCommandContext>
  );
});
