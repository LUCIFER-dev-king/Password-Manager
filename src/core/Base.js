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
          <div className='p-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Base;
