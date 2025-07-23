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

const ToastStateContext = createContext<{ message: string; type: ToastType }>({
  message: "",
  type: "info",
});

const ToastActionsContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

// const ToastContext = createContext<{
//   message: string;
//   type: ToastType;
//   show: ShowToast;
//   hide: Hide;
// }>({
//   ...initialState,
//   show: () => null,
//   hide: () => null,
// });

const DEFAULT_DELAY = 3000;

// const useToastContext = () => useContext(ToastContext);
export const useToastState = () => useContext(ToastStateContext);
export const useToastCommand = () => useContext(ToastActionsContext);
// export const useToastCommand = () => {
//   const { show, hide } = useToastContext();
//   return { show, hide };
// };
// export const useToastState = () => {
//   const { message, type } = useToastContext();
//   return { message, type };
// };

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  // const { show, hide } = createActions(dispatch);
  const { show, hide } = useRef(createActions(dispatch)).current;
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const actionsValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);
  const stateValue = useMemo(() => ({ message: state.message, type: state.type }), [state.message, state.type]);

  return (
    <ToastActionsContext.Provider value={actionsValue}>
      <ToastStateContext.Provider value={stateValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastActionsContext.Provider>
  );
});
