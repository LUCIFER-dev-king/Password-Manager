import React, { useEffect } from "react";
import Base from "../../core/Base";
import { getUser } from "./helper/homeHelper";
import { isAuthenticated } from "../../auth/helper/authHelper";
import { connect } from "react-redux";
import { setUserVault } from "../../redux/actions";
import Search from "../search/Search";
import { useHistory } from "react-router";

const Home = ({ setUserVault }) => {
  const { _id } = isAuthenticated();
  const history = useHistory();
  useEffect(() => {
    getUser(_id).then((result) => {
      try {
        if (result.status === 200) {
          setUserVault(result.data);
        }
      } catch (error) {
        history.push("/signin");
        localStorage.removeItem("user");
      }
    });
  }, []);
  return (
    <Base>
      <div className="container">
        <Search />
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
