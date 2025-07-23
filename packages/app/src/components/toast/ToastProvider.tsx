/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useCallback, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastStateContext = createContext<{ message: string; type: ToastType }>(initialState);
const ToastCommandContext = createContext<{ show: ShowToast; hide: Hide }>({ show: () => null, hide: () => null });

export const useToastState = () => useContext(ToastStateContext);
export const useToastCommand = () => useContext(ToastCommandContext);

const DEFAULT_DELAY = 3000;

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
    [hideAfter, show],
  );

  const command = useMemo(
    () => ({
      show: showWithHide,
      hide,
    }),
    [hide, showWithHide],
  );

  return (
    <ToastCommandContext value={command}>
      <ToastStateContext value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastCommandContext>
  );
});
