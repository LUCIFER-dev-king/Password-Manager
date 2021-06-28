import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaAddressCard,
  FaHome,
  FaNotesMedical,
  FaPage4,
  FaPiggyBank,
} from "react-icons/fa";
const SideBar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(location.pathname);
  }, []);

  const handleActiveClick = (value) => {
    if (value === active) {
      return;
    }
    setActive(value);
  };
  return (
    <div className='d-flex p-3 flex-column text-white'>
      <a href='#' className='text-decoration-none text-white'>
        <h4>Last pass</h4>
      </a>
      <hr />
      <ul className='nav nav-pills flex-column mb-auto text-white'>
        <li className='nav-item'>
          {active === "/" ? (
            <a className='nav-link active text-white' href='/'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Home
            </a>
          ) : (
            <a className='nav-link text-white' href='/'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Home
            </a>
          )}
        </li>
        <li className='nav-item'>
          {active === "/password" ? (
            <a className='nav-link active text-white' href='/password'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Password
            </a>
          ) : (
            <a className='nav-link text-white' href='/password'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Password
            </a>
          )}
        </li>
        <li className='nav-item'>
          {active === "/notes" ? (
            <a className='nav-link active text-white' href='/notes'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Notes
            </a>
          ) : (
            <a className='nav-link text-white' href='/notes'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Notes
            </a>
          )}
        </li>
        <li className='nav-item'>
          {active === "/address" ? (
            <a className='nav-link active text-white' href='/address'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Address
            </a>
          ) : (
            <a className='nav-link text-white' href='/address'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Address
            </a>
          )}
        </li>
        <li className='nav-item'>
          {active === "/paymentcards" ? (
            <a className='nav-link active text-white' href='/paymentcards'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Payment Cards
            </a>
          ) : (
            <a className='nav-link text-white' href='/paymentcards'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Payment Cards
            </a>
          )}
        </li>
        <li className='nav-item'>
          {active === "/bankaccount" ? (
            <a className='nav-link active text-white' href='/bankaccount'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Bank Account
            </a>
          ) : (
            <a className='nav-link text-white' href='/bankaccount'>
              <FaHome className='mb-1' style={{ marginRight: ".5rem" }} />
              Bank Account
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
