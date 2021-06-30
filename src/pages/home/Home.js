import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import VaultCard from "../../component/VaultCard";
import { getUser } from "./helper/homeHelper";
import { isAuthenticated } from "../../auth/helper/authHelper";
import { connect } from "react-redux";
import { setUserVault } from "../../redux/actions";

const Home = ({ setUserVault }) => {
  const { user, token } = isAuthenticated();
  useEffect(() => {
    getUser(user._id, token).then((result) => {
      // console.log(result.password_vault);
      setUserVault(result);
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setUserVault: (uservault) => {
    dispatch(setUserVault(uservault));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
