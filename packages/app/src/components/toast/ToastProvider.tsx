/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

// Command Context
const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

// State Context
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

  const actions = useMemo(() => createActions(dispatch), []);
  const { show, hide } = actions;

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide = useCallback<ShowToast>(
    (...args) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );

  const commandValue = useMemo(
    () => ({
      show: showWithHide,
      hide,
    }),
    [showWithHide, hide],
  );

  const stateValue = useMemo(
    () => ({
      message: state.message,
      type: state.type,
    }),
    [state.message, state.type],
  );

  return (
    <ToastCommandContext.Provider value={commandValue}>
      <ToastStateContext.Provider value={stateValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastCommandContext.Provider>
  );
});
