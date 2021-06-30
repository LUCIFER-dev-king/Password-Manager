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
import { setUserVault } from "../../redux/actions";
import { connect } from "react-redux";

const Password = ({ setUserVault, UserVault }) => {
  const { user, token } = isAuthenticated();
  const [isDataEncrypted, setIsDataEncrypted] = useState("");
  const [sitePassword, setSitePassword] = useState("");
  const [vaultName, setVaultName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [siteUsername, setSiteUsername] = useState("");
  const [passwordVaultList, setPasswordVaultList] = useState([]);

  const history = useHistory();
  const onSubmit = () => {
    setSitePassword(encryptValues(user.password, sitePassword));
    setSiteUrl(encryptValues(user.password, siteUrl));
    setSiteUsername(encryptValues(user.password, siteUsername));
    setVaultName(encryptValues(user.password, vaultName));
    setIsDataEncrypted(encryptValues(user.password, sitePassword));

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
        setUserVault(result);
        console.log("redux", UserVault);
        // UserVault.map((k, i) => {
        //   console.log(k);
        // });
      }
    });

    if (isDataEncrypted !== "") {
      createPasswordVault(user._id, token, {
        sitePassword,
        siteUrl,
        siteUsername,
        vaultName,
      }).then((result) => {
        if (result.status == 200) {
          console.log("Encryption saved successful");
          // console.log(result);
          setUserVault(result.data.password_vault);
        }
      });
    }
  }, [isDataEncrypted]);

  return (
    <Base>
      <div className='row'>
        {UserVault !== undefined ? (
          UserVault.map((pv, id) => <VaultCard />)
        ) : (
          <h4>No Passwords Found</h4>
        )}
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
          <div className='d-flex'>
            <div className='form-group m-1'>
              <label htmlFor='vault_name'>Vault Name</label>
              <input
                id='vault_name'
                type='text'
                className='form-control'
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
              />
            </div>
            <div className='form-group m-1'>
              <label htmlFor='site_url'>Website Url</label>
              <input
                id='site_url'
                type='text'
                className='form-control'
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
              />
            </div>
          </div>
          <div className='d-flex'>
            <div className='form-group m-1'>
              <label htmlFor='site_username'>Site Username</label>
              <input
                id='site_username'
                type='text'
                className='form-control'
                value={siteUsername}
                onChange={(e) => setSiteUsername(e.target.value)}
              />
            </div>
            <div className='form-group m-1'>
              <label htmlFor='sitePassword'>Site Password</label>
              <input
                id='sitePassword'
                type='password'
                className='form-control'
                value={sitePassword}
                onChange={(e) => setSitePassword(e.target.value)}
              />
            </div>
          </div>

          <button className='btn btn-dark w-100 mt-3' onClick={onSubmit}>
            Submit
          </button>
        </PopUpModal>
      </div>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  UserVault: state.UserVault[0],
});

const mapDispatchToProps = (dispatch) => ({
  setUserVault: (uservault) => {
    dispatch(setUserVault(uservault));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);
