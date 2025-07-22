/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback, useMemo } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState
});

const ToastActionContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

export const useToastCommand = () => useContext(ToastActionContext);
export const useToastState = () => useContext(ToastStateContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  // show, hide useMemo를 사용 (actionContextValue 에서도 useMemo 사용)
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";

  const hideAfter = debounce(hide, DEFAULT_DELAY);

  // useCallback 을 사용하면 의존성에 해당하는 것들도 useCallback을 해줘야함.
  // 번거롭기 때문에 useAutoCallback을 사용. (의존성 없이 똑같은 참조만 반환하도록)
  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  // 상태는 상태대로 따로 전달
  const stateContextValue = useMemo(
    () => ({ message: state.message, type: state.type }), 
    [state.message, state.type]
  );

  // 액션은 변하지 않게 useMemo로 고정
  const actionContextValue = useMemo(
    () => ({ show: showWithHide, hide }),
    [showWithHide, hide]
  );

  return (
    <ToastActionContext.Provider value={actionContextValue}>
      <ToastStateContext.Provider value={stateContextValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastActionContext.Provider> 
  );
});
