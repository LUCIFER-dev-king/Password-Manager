import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import VaultCard from "../../component/VaultCard";

const Home = () => {
  return (
    <Base>
      <div className='row'>
        <VaultCard />
      </div>
    </Base>
  );
};

export default Home;
