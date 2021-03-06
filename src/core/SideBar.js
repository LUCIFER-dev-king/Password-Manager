import React, { useState, useEffect } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import "./core.css";
import { FaHome, FaBars } from "react-icons/fa";
import {
  MdAccountBalance,
  MdExitToApp,
  MdNoEncryption,
  MdNote,
  MdExtension,
} from "react-icons/md";
import { signOut } from "../auth/helper/authHelper";
const SideBar = () => {
  const location = useLocation();
  const history = useHistory();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(location.pathname);
  }, []);

  const onSignOut = () => {
    signOut().then((res) => {
      if (res) {
        history.push("/signin");
      }
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex align-items-center">
            <div>
              <FaBars className="ms-2" />
            </div>
            <div className="sidebar-title ms-2">
              <h5>E Pass</h5>
            </div>
          </div>
          <div className="text-muted mt-4 ms-2 sidebar-items-title">
            <h5>Credentials</h5>
          </div>
          <Link
            to="/"
            className={
              active === "/"
                ? "mt-3 sidebar-items active"
                : "mt-3 sidebar-items"
            }
          >
            <div>
              <FaHome className="me-2 fs-5" />
            </div>
            <div className="sidebar-items-text m-0">Home</div>
          </Link>
          <Link
            to="/password"
            className={
              active === "/password"
                ? "mt-1 sidebar-items active"
                : "mt-1 sidebar-items"
            }
          >
            <div>
              <MdNoEncryption className="me-2 fs-5" />
            </div>
            <div className="sidebar-items-text m-0">Passwords</div>
          </Link>
          <Link
            to="/notes"
            className={
              active === "/notes"
                ? "mt-1 sidebar-items active"
                : "mt-1 sidebar-items"
            }
          >
            <div>
              <MdNote className="me-2 fs-5" />
            </div>
            <div className="sidebar-items-text m-0">Notes</div>
          </Link>
          <Link
            to="/bankaccount"
            className={
              active === "/bankaccount"
                ? "mt-1 sidebar-items active"
                : "mt-1 sidebar-items"
            }
          >
            <div>
              <MdAccountBalance className="me-2 fs-5" />
            </div>
            <div className="sidebar-items-text m-0">Bank Account</div>
          </Link>
          <a
            href="https://github.com/LUCIFER-dev-king/password-manager-extension"
            className="sidebar-items"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <MdExtension className="me-2 fs-5 text-muted" />
            </div>
            <span className="sidebar-items-text">Extenstion</span>
          </a>
        </div>

        <div className="sidebar-items" onClick={onSignOut}>
          <div>
            <MdExitToApp className="me-2 fs-5 text-muted" />
          </div>
          <span className="sidebar-items-text">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
