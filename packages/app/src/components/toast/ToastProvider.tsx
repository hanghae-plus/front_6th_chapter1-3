/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType, Actions as ToastActions } from "./toastReducer";
import { debounce } from "../../utils";
import { useShallowSelector, useMemo, useCallback } from "@hanghae-plus/lib/src/hooks";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

type ToastStateContextType = {
  message: string;
  type: ToastType;
};

type ToastCommandContextType = {
  show: ShowToast;
  hide: Hide;
};
const ToastStateContext = createContext<ToastStateContextType>({
  ...initialState,
});

const ToastCommandContext = createContext<ToastCommandContextType>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

const useToastStateContext = () => useContext(ToastStateContext);
const useToastCommandContext = () => useContext(ToastCommandContext);

export const useToastCommand = () => {
  const context = useToastCommandContext();
  const shallowSelector = useShallowSelector((state: ToastCommandContextType) => {
    const { show, hide } = state;
    return { show, hide };
  });

  return shallowSelector(context);
};

export const useToastState = () => {
  const { message, type } = useToastStateContext();

  return { message, type };
};

const ToastStateProvider = memo(({ children, state }: PropsWithChildren<{ state: ToastStateContextType }>) => {
  const stateValue = useMemo(() => ({ message: state.message, type: state.type }), [state.message, state.type]);

  const visible = state.message !== "";
  return (
    <ToastStateContext.Provider value={stateValue}>
      {children}
      {visible && createPortal(<Toast />, document.body)}
    </ToastStateContext.Provider>
  );
});

const ToastCommandProvider = memo(
  ({ children, dispatch }: PropsWithChildren<{ dispatch: React.Dispatch<typeof ToastActions> }>) => {
    const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);

    const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

    const showWithHide = useCallback<ShowToast>(
      (...args) => {
        show(...args);
        hideAfter();
      },
      [show, hideAfter],
    );

    const commandValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

    return <ToastCommandContext.Provider value={commandValue}>{children}</ToastCommandContext.Provider>;
  },
);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  return (
    <ToastCommandProvider dispatch={dispatch}>
      <ToastStateProvider state={state}>{children}</ToastStateProvider>
    </ToastCommandProvider>
  );
});
