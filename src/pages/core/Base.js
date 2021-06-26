import React from "react";
import Header from "./Header";
import {
  FaAddressCard,
  FaHome,
  FaNotesMedical,
  FaPage4,
  FaPiggyBank,
} from "react-icons/fa";
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
        </div>
      </div>
    </div>
  );
};

export default Base;
