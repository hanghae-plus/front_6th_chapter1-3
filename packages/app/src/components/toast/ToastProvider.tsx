/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { initialState, toastReducer, type ToastType } from "./toastReducer";
import { useToastActions } from "../../hooks/useToastActions";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastActionsContext = createContext<{
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

const useToastActionContext = () => useContext(ToastActionsContext);
const useToastStateContext = () => useContext(ToastStateContext);

export const useToastCommand = () => {
  const { show, hide } = useToastActionContext();
  return { show, hide };
};

export const useToastState = () => {
  const { message, type } = useToastStateContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const actions = useToastActions({ dispatch });
  const visible = state.message !== "";

  return (
    <ToastActionsContext value={actions}>
      <ToastStateContext value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastActionsContext>
  );
});
