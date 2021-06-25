import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/authHelper";
import Base from "./Base";
import {
  createPasswordVault,
  encryptValues,
  getAPasswordVault,
  getUser,
} from "./helper/homeHelper";

const Home = () => {
  const { user, token } = isAuthenticated();
  const [isDataEncrypted, setIsDataEncrypted] = useState("");
  const [site_password, setSite_password] = useState("");

  const history = useHistory();
  const onSubmit = () => {
    // setSite_password(encryptValues(user.password, site_password));
    // setIsDataEncrypted(encryptValues(user.password, site_password));

    // getAPasswordVault(
    //   user._id,
    //   token,
    //   "60d33bf3f7ac6763a0f694e4",
    //   user.password
    // );

    getUser(user._id, token);
  };

  useEffect(() => {
    if (isDataEncrypted !== "") {
      createPasswordVault(user._id, token, { site_password }).then((result) => {
        if (result.status == 200) {
          console.log("Encryption saved successful");
        }
      });
    }
  }, [isDataEncrypted]);

  return (
    <Base>
      <div className='container fluid'>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={site_password}
            onChange={(e) => setSite_password(e.target.value)}
          />
        </div>
        <button className='btn btn-dark m-3' onClick={onSubmit}>
          sumbit
        </button>
      </div>
    </Base>
  );
};

export default Home;
