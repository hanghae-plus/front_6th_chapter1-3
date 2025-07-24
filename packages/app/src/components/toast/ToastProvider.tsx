/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useMemo, useReducer, useCallback } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastStateContext = createContext(initialState);
const ToastCommandsContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => useContext(ToastCommandsContext);
export const useToastState = () => useContext(ToastStateContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);

  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide = useCallback(
    (...args: Parameters<ShowToast>) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );

  const commands = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastStateContext.Provider value={state}>
      <ToastCommandsContext.Provider value={commands}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastCommandsContext.Provider>
    </ToastStateContext.Provider>
  );
});
