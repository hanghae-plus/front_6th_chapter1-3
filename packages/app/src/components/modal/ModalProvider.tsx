/* eslint-disable react-refresh/only-export-components */

import { createContext, memo, type PropsWithChildren, type ReactNode, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { Modal } from "./Modal";

type ModalContextValue = {
  close: () => void;
  open: (content: ReactNode) => void;
};

const ModalContext = createContext<ModalContextValue>({
  close: () => null,
  open: () => null,
});

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("ModalProvider 내에서 useModalContext을 사용해야 합니다!");
  }

  return context;
};

export const ModalProvider = memo(({ children }: PropsWithChildren) => {
  const [content, setContent] = useState<ReactNode>(null);

  const modalContextValue = useMemo<ModalContextValue>(
    () => ({
      close: () => setContent(null),
      open: setContent,
    }),
    [],
  );

  return (
    <ModalContext value={modalContextValue}>
      {children}
      {content && createPortal(<Modal>{content}</Modal>, document.body)}
    </ModalContext>
  );
});
