/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useMemo, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback } from "@hanghae-plus/lib";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

type ToastQuery = { message: string; type: ToastType };
type ToastCommand = { show: ShowToast; hide: Hide };

const ToastQueryContext = createContext<ToastQuery>({ ...initialState });
const ToastCommandContext = createContext<ToastCommand>({ show: () => null, hide: () => null });

const DEFAULT_DELAY = 3000;

const useToastQueryContext = () => useContext(ToastQueryContext);
const useToastCommandContext = () => useContext(ToastCommandContext);

export const useToastCommand = () => {
  const { show, hide } = useToastCommandContext();
  return { show, hide };
};
export const useToastState = () => {
  const { message, type } = useToastQueryContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [queryValue, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = createActions(dispatch);
  const visible = queryValue.message !== "";

  const hideAfter = debounce(hide, DEFAULT_DELAY);

  const memoizedShow = useAutoCallback((message: string, type: ToastType) => {
    show(message, type);
    hideAfter();
  });

  const memoizedHide = useAutoCallback(hide);

  const memoizedCommandValue = useMemo(
    () => ({ show: memoizedShow, hide: memoizedHide }),
    [memoizedShow, memoizedHide],
  );

  return (
    <ToastCommandContext.Provider value={memoizedCommandValue}>
      <ToastQueryContext.Provider value={queryValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastQueryContext.Provider>
    </ToastCommandContext.Provider>
  );
});
