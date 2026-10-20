"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

export function Modal({
  children,
  onClose,
  labelledBy,
  className = "",
  onKeyDown,
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  onKeyDown?: (event: KeyboardEvent) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const backdrop = (event: MouseEvent) => {
      if (event.target === dialog) onClose();
    };
    dialog.addEventListener("click", backdrop);
    if (onKeyDown) dialog.addEventListener("keydown", onKeyDown);
    return () => {
      dialog.removeEventListener("click", backdrop);
      if (onKeyDown) dialog.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onKeyDown]);
  return (
    <dialog
      ref={ref}
      aria-modal="true"
      className={`modal ${className}`}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="modal-content">
        <button
          type="button"
          className="modal-close icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={22} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
