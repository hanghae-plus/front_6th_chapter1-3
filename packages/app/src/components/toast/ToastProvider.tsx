/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

// 상태 컨텍스트 (리렌더 유발)
const ToastStateContext = createContext({
  message: "",
  type: "info" as ToastType,
});

// 액션 컨텍스트 (리렌더 유발 X)
const ToastActionContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => {},
  hide: () => {},
});

const DEFAULT_DELAY = 3000;

export const useToastState = () => useContext(ToastStateContext);
export const useToastCommand = () => useContext(ToastActionContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = createActions(dispatch);

  const visible = state.message !== "";
  const hideAfter = debounce(hide, DEFAULT_DELAY);

  const showWithHide: ShowToast = (...args) => {
    show(...args);
    hideAfter();
  };

  const actions = useMemo(() => ({ show: showWithHide, hide }), []);

  return (
    <ToastActionContext.Provider value={actions}>
      <ToastStateContext.Provider value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastActionContext.Provider>
  );
});
