import { createContext, memo, type PropsWithChildren, type ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "./Modal";
import { useCallback } from "@hanghae-plus/lib/src/hooks";

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

  const open = useCallback((newContent: ReactNode) => setContent(newContent), []);

  const close = useCallback(() => setContent(null), []);

  return (
    <ModalContext value={{ open, close }}>
      {children}
      {content && createPortal(<Modal>{content}</Modal>, document.body)}
    </ModalContext>
  );
});
