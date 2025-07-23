/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer, useMemo } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  message: initialState.message,
  type: initialState.type,
});

const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => useContext(ToastCommandContext);
export const useToastState = () => useContext(ToastStateContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const visible = state.message !== "";

  const commands = useMemo(() => {
    const { show, hide } = createActions(dispatch);
    const hideAfter = debounce(hide, DEFAULT_DELAY);

    const showWithHide: ShowToast = (...args) => {
      show(...args);
      hideAfter();
    };

    return { show: showWithHide, hide };
  }, []);

  const stateValue = useMemo(
    () => ({
      message: state.message,
      type: state.type,
    }),
    [state.message, state.type],
  );

  return (
    <ToastCommandContext value={commands}>
      <ToastStateContext value={stateValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastCommandContext>
  );
});
