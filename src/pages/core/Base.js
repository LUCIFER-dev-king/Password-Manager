import React from "react";
import Header from "./Header";
import { FaTimes } from "react-icons/fa";
import SideBar from "./SideBar";
const Base = ({ children }) => {
  return (
    <div className='container-fluid'>
      <div className='row vh-100'>
        <div className='col-md-3 bg-dark '>
          <SideBar />
        </div>
        <div className='col-md-9'>
          <Header></Header>
          <div className='bg-dark text-white p-4'>{children}</div>

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
          >
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
                <div class='modal-body'>...</div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Close
                  </button>
                  <button type='button' class='btn btn-primary'>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base;
