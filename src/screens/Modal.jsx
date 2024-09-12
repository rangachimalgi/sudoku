import React from "react";
import "./Modal.css"; // Style the modal as per your need

export const Modal = ({ show, handleClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
