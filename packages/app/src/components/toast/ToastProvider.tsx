/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback } from "@hanghae-plus/lib";
import { useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastStateContext = createContext<{ message: string; type: ToastType }>(initialState);
const ToastActionContext = createContext<{ show: ShowToast; hide: Hide }>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

export const useToastState = () => useContext(ToastStateContext);
export const useToastCommand = () => useContext(ToastActionContext);

export const ToastProvider = memo(({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);

  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);
  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const stateValue = useMemo(() => ({ message: state.message, type: state.type }), [state.message, state.type]);
  const actionValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);


  return (
    <ToastStateContext.Provider value={stateValue}>
      <ToastActionContext.Provider value={actionValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastActionContext.Provider>
    </ToastStateContext.Provider>
  );
});
