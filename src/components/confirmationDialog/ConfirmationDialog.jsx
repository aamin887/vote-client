import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import "./confirmationDialog.css";

function ConfirmationDialog({
  title,
  icon,
  id,
  isOpened,
  onProceed,
  onClose,
  children,
}) {
  const ref = useRef();

  const isClickInsideRectangle = (e, element) => {
    const r = element.getBoundingClientRect();
    return (
      e.clientX > r.left &&
      e.clientX < r.right &&
      e.clientY > r.top &&
      e.clientY < r.bottom
    );
  };

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal__open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal__open");
    }
  }, [isOpened]);

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onProceed(id);
    onClose();
  };

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
      className="dialog"
    >
      <div className="dialog__modal">
        <div className="dialog__modal-content">
          <div className="dialog__modal-header">
            <div className="dialog__modal-header_icon">{icon}</div>
            <h4>{title}</h4>
            <button
              type="button"
              className="close-btn"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={handleCancel}
            >
              <FaTimes />
            </button>
          </div>
          <div className="dialog__modal-content_body">{children}</div>
          <div className="dialog__modal-content_footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmationDialog;
