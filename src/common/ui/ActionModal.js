import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

const ActionModal = ({ children, text }) => {
  const modalRoot = useMemo(() => document.getElementById("modal-root"), []);

  useEffect(() => {
    // keep your debug
    console.log("ActionModal mounted", { modalRoot });

    // prevent background scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [modalRoot]);

  if (!modalRoot) return null;

  return createPortal(
    <div className="modalBackground" role="dialog" aria-modal="true">
      <div className="modalContainer">
        <div>
          {text === "add" ? (
            <i className="uil uil-check-circle modal_circle_approve" />
          ) : (
            <i className="uil uil-info-circle modal_circle" />
          )}
        </div>

        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default ActionModal;