import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, setOpen, children, title }) => {
  const modalRoot = useMemo(() => document.getElementById("modal-root"), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [modalRoot, open]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={open ? "modal fade show sf-modal-open" : "modal fade sf-modal-closed"}
      aria-hidden={!open}
      role="dialog"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable sf-modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <label className="form-title">[ {title} ]</label>
            <button
              type="button"
              className="close"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true" className="close__times">
                &times;
              </span>
            </button>
          </div>

          <div className="modal-body text-light">{children}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;