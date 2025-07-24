/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, memo } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { useAutoCallback, useMemo } from "@hanghae-plus/lib";

import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

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

  // 상태와 액션을 분리해서 각각의 Context로 제공
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
