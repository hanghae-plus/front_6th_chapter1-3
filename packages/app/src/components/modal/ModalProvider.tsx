/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, type ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "./Modal";

export const ModalContext = createContext<{
  open: (content: ReactNode) => void;
  close: () => void;
}>({
  open: () => null,
  close: () => null,
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = memo(({ children }: PropsWithChildren) => {
  const [content, setContent] = useState<ReactNode>(null);

  const [actions] = useState(() => ({
    open: (newContent: ReactNode) => setContent(newContent),
    close: () => setContent(null),
  }));

  return (
    <ModalContext value={actions}>
      {children}
      {content && createPortal(<Modal>{content}</Modal>, document.body)}
    </ModalContext>
  );
});
