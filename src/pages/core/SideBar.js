import React from "react";
import {
  FaAddressCard,
  FaHome,
  FaNotesMedical,
  FaPage4,
  FaPiggyBank,
} from "react-icons/fa";
const SideBar = () => {
  return (
    <div className='d-flex p-3 flex-column text-white'>
      <a href='#' className='text-decoration-none text-white'>
        <h4>Last pass</h4>
      </a>
      <hr />
      <ul className='nav nav-pills flex-column mb-auto text-white'>
        <li className='nav-item'>
          <a className='nav-link active' href=''>
            <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
            Home
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link  text-white' href=''>
            <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
            Password
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link  text-white' href=''>
            <FaNotesMedical className='mb-1' style={{ marginRight: ".5rem" }} />
            Notes
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link  text-white' href=''>
            <FaAddressCard className='mb-1' style={{ marginRight: ".5rem" }} />
            Address
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-white' href=''>
            <FaPage4 className='mb-1' style={{ marginRight: ".5rem" }} />
            Payment Cards
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link  text-white' href=''>
            <FaPiggyBank className='mb-1' style={{ marginRight: ".5rem" }} />
            Bank Accounts
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;