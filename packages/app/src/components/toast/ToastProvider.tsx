/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

export const ToastActionContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const DEFAULT_DELAY = 3000;

export const useToastAction = () => {
  const { show, hide } = useContext(ToastActionContext);
  return { show, hide };
};
export const useToastState = () => {
  const { message, type } = useContext(ToastStateContext);
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  // actions를 메모이제이션하여 매번 새로운 객체가 생성되는 것을 방지
  const actions = useMemo(() => createActions(dispatch), [dispatch]);
  const { show, hide } = actions;
  const visible = state.message !== "";

  // hideAfter 함수를 useMemo으로 메모이제이션
  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  // showWithHide 함수를 useCallback으로 메모이제이션
  const showWithHide: ShowToast = useCallback(
    (...args) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );

  const memodedState = useMemo(() => ({ message: state.message, type: state.type }), [state.message, state.type]);
  const memoedAction = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastActionContext.Provider value={memoedAction}>
      <ToastStateContext.Provider value={memodedState}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastActionContext.Provider>
  );
});
