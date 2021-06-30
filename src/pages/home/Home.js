import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import VaultCard from "../../component/VaultCard";
import { getUser } from "./helper/homeHelper";
import { isAuthenticated } from "../../auth/helper/authHelper";

const Home = () => {
  const { user, token } = isAuthenticated();
  useEffect(() => {
    getUser(user._id, token).then((result) => {
      console.log(result);
    });
  }, []);
  return (
    <Base>
      <div className='row'>
        <VaultCard />
      </div>
    </Base>
  );
};

export default Home;
