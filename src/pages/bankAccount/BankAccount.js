import React from "react";
import Base from "../../core/Base";
const BankAccount = () => {
  return (
    <Base>
      <button
        type='button'
        className='position-absolute bottom-0 end-0 m-3 btn btn-danger rounded'
        data-bs-toggle='modal'
        data-bs-target='#testModal'
      >
        <FaTimes />
      </button>
      <div
        class='modal fade'
        id='testModal'
        tabindex='-1'
        aria-labelledby='testModalLabel'
        aria-hidden='true'
      ></div>
    </Base>
  );
};

export default BankAccount;
