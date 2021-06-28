import React from "react";
import Header from "./Header";
import { FaTimes } from "react-icons/fa";
import SideBar from "./SideBar";
import PopUpModal from "../component/PopUpModal";
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
            <PopUpModal>
              <div>From Home</div>
            </PopUpModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base;
