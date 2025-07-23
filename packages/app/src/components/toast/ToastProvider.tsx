/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useCallback, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastState, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastStateContext = createContext<ToastState>(initialState);
const ToastCommandContext = createContext<{ show: ShowToast; hide: Hide }>({ show: () => null, hide: () => null });

const DEFAULT_DELAY = 3000;

const useToastStateContext = () => useContext(ToastStateContext);
const useToastCommandContext = () => useContext(ToastCommandContext);
export const useToastCommand = () => {
  const { show, hide } = useToastCommandContext();

  return useMemo(() => ({ show, hide }), [show, hide]);
};
export const useToastState = () => {
  const { message, type } = useToastStateContext();

  return useMemo(() => ({ message, type }), [message, type]);
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useMemo(() => createActions(dispatch), []);
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useCallback(
    (...args) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );

  const commands = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);
  const value = useMemo(() => ({ ...state }), [state]);

  return (
    <ToastStateContext.Provider value={value}>
      <ToastCommandContext.Provider value={commands}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastCommandContext.Provider>
    </ToastStateContext.Provider>
  );
});
