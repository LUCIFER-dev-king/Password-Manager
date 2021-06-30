import React from "react";

const PopUpModal = ({ children }) => {
  console.log(children);
  return (
    <div class='modal-dialog modal-dialog-centered'>
      <div class='modal-content'>
        <div class='modal-header'>
          <h5 class='modal-title' id='testModalLabel'>
            Modal title
          </h5>
          <button
            type='button'
            class='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'
          ></button>
        </div>
        <div class='modal-body'>{children}</div>
      </div>
    </div>
  );
};

export default PopUpModal;
