import React from "react";

const Header = () => {
  return (
    <div className='navbar navbar-expand-lg bg-light d-flex justify-content-between'>
      <div className='navbar-brand'>Last Pass</div>
      <div className='navbar-nav' style={{ marginRight: "1rem" }}>
        Account
      </div>
    </div>
  );
};

export default Header;
