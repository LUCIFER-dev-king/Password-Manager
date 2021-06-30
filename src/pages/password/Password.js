import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper/authHelper";
import PopUpModal from "../../component/PopUpModal";
import Base from "../../core/Base";
import {
  createPasswordVault,
  encryptValues,
  getAPasswordVault,
  getPasswordVaults,
  getUser,
} from "./helper/passwordHelper";
import { FaTimes } from "react-icons/fa";
import VaultCard from "../../component/VaultCard";

const Password = () => {
  const { user, token } = isAuthenticated();
  const [isDataEncrypted, setIsDataEncrypted] = useState("");
  const [site_password, setSite_password] = useState("");
  const [passwordVaultList, setPasswordVaultList] = useState([]);

  const history = useHistory();
  const onSubmit = () => {
    setSite_password(encryptValues(user.password, site_password));
    setIsDataEncrypted(encryptValues(user.password, site_password));
    // getAPasswordVault(
    //   user._id,
    //   token,
    //   "60d33bf3f7ac6763a0f694e4",
    //   user.password
    // );
  };

  useEffect(() => {
    getPasswordVaults(user._id, token).then((result) => {
      if (result) {
        setPasswordVaultList(result);
      }
    });

    if (isDataEncrypted !== "") {
      createPasswordVault(user._id, token, { site_password }).then((result) => {
        if (result.status == 200) {
          console.log("Encryption saved successful");
          console.log(result);
        }
      });
    }
  }, [isDataEncrypted]);

  return (
    <Base>
      <div className='row'>
        {passwordVaultList.map((pv, id) => (
          <VaultCard />
        ))}
      </div>

      <button
        type='button'
        className='position-absolute bottom-0 end-0 m-3 btn btn-danger rounded'
        data-bs-toggle='modal'
        data-bs-target='#testModal'
      >
        <FaTimes />
      </button>

      <div
        class='modal fade'
        id='testModal'
        tabindex='-1'
        aria-labelledby='testModalLabel'
        aria-hidden='true'
      >
        <PopUpModal>
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
        </PopUpModal>
      </div>
    </Base>
  );
};

export default Password;
