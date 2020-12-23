import React from "react";
import Modal from "react-modal";

const modalStyles = {
  content: {
    zIndex: 10000,
    width: "350px",
    height: "120px",
    textAlign: "center",
    verticalAlign: "middle",
  },
};

Modal.setAppElement("#root");

const DeleteModal = ({ isOpen, onModalClick }) => {
  return (
    <div>
      <Modal isOpen={isOpen} style={modalStyles}>
        <span>Are you sure you want to delete this entry?</span>
        <div className="modal-btns">
          <button
            className="yes-btn btn btn-primary"
            onClick={() => onModalClick("yes")}
          >
            yes
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onModalClick("no")}
          >
            no
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
