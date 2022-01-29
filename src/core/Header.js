import React from "react";
import SideBar from "./SideBar";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 1px 0 rgba(22,8,43,0.1)",
      }}
    >
      <div className="container d-flex py-2">
        <h5 className="ms-5 ms-sm-2 fs-4">E Pass</h5>
      </div>
      <SideBar />
    </div>
  );
};

export default Header;
