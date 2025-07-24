/* eslint-disable react-refresh/only-export-components */
import { useAutoCallback, useMemo } from "@hanghae-plus/lib/src/hooks";
import { memo, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import { debounce } from "../../utils";
import { createSafeContext } from "../../utils/createSafeContext";
import { Toast } from "./Toast";
import { type ToastType, createActions, initialState, toastReducer } from "./toastReducer";

const DEFAULT_DELAY = 3000;

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

interface Props {
  children: React.ReactNode;
}

export const ToastProvider = memo(({ children }: Props) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = createActions(dispatch);

  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const [command] = useState(() => ({
    show: showWithHide,
    hide,
  }));

  return (
    <ToastStateProvider {...state}>
      <ToastCommandProvider {...command}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastCommandProvider>
    </ToastStateProvider>
  );
});

interface ContextState {
  message: string;
  type: ToastType;
}

interface ContextCommand {
  show: ShowToast;
  hide: Hide;
}

export const [ToastStateProvider, useToastState] =
  createSafeContext<ContextState>("ToastStateProvider");
export const [ToastCommandProvider, useToastCommand] =
  createSafeContext<ContextCommand>("ToastCommandProvider");
