import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/helper/authHelper";
import PopUpModal from "../../component/PopUpModal";
import Base from "../../core/Base";
import { decryptValues, encryptValues } from "../../utils/encryptDecrypt";
import {
  createPasswordVault,
  deletePasswordVault,
  getPasswordVaults,
  updatePasswordVault,
} from "./helper/passwordHelper";
import { FaPlus } from "react-icons/fa";
import VaultCard from "../../component/VaultCard";
import { setUserVault } from "../../redux/actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { colorCodes } from "../../utils/colorCodes";
import { deleteRecentItems } from "../../utils";

const Password = ({ setUserVault, UserVault }) => {
  const { _id } = isAuthenticated();
  const history = useHistory();
  const [modelToggle, setModelToggle] = useState(false);
  const [createOrUpdateToggle, setCreateOrUpdateToggle] = useState(false);
  const passwordVaultItemsLabelList = [
    "Site Password",
    "Site Url",
    "Site Username",
    "Vault Name",
  ];
  const passwordVaultItemsList = [
    "sitePassword",
    "siteUrl",
    "siteUsername",
    "vaultName",
  ];
  const initialPasswordVaultValues = {
    sitePassword: "",
    siteUrl: "",
    siteUsername: "",
    vaultName: "",
  };
  const [passwordVaultList, setPasswordVaultList] = useState(
    initialPasswordVaultValues
  );

  //This handles the onchange of initialPasswordVaultValues
  const onChangeInputHandler = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setPasswordVaultList({
      ...passwordVaultList,
      [name]: value,
    });
  };

  //Password are stored to vault
  const onSubmit = async (e) => {
    e.preventDefault();

    createPasswordVault(_id, passwordVaultList).then((result) => {
      if (result.status === 200) {
        console.log("Encryption saved successful", result.data.password_vault);
        setUserVault(result.data.password_vault);
        setModelToggle((prev) => !prev);
      }
    });
  };

  //Decrypted passwords showed to user via popupmodel
  const setModalVaultPassword = async (passVault) => {
    let decryptedObject = {
      siteUrl: "",
      siteUsername: "",
      vaultName: "",
      sitePassword: "",
    };
    for (const [key, value] of Object.entries(passVault)) {
      if (key === "_id" || key === "siteUrl" || key === "vaultName") {
        decryptedObject[key] = value;
      } else {
        let decryptedValue = await decryptValues(_id, value);
        decryptedObject[key] = decryptedValue;
      }
    }
    setPasswordVaultList(decryptedObject);
  };

  //To delete a password from vault
  const onDeletePassVault = (vault) => {
    console.log(vault);
    deletePasswordVault(_id, vault).then((result) => {
      if (result.status === 200) {
        setUserVault(result.data.password_vault);
        deleteRecentItems(vault);
      }
    });
  };

  //To update existing passwords in vault
  const updateHandler = async () => {
    let enryptedPasswordList = {
      sitePassword: "",
      siteUrl: "",
      siteUsername: "",
      vaultName: "",
    };
    for (const [key, value] of Object.entries(passwordVaultList)) {
      if (key === "vaultName" || key === "_id" || key === "siteUrl") {
        enryptedPasswordList[key] = value;
      } else {
        let encryptedValue = await encryptValues(_id, value);
        enryptedPasswordList[key] = encryptedValue;
      }
    }
    updatePasswordVault(_id, enryptedPasswordList).then((res) => {
      if (res.status === 200) {
        setUserVault(res.data.password_vault);
        setModelToggle((prev) => !prev);
      }
    });
  };

  //Fetches password from DB.
  useEffect(() => {
    getPasswordVaults(_id).then((result) => {
      try {
        if (result.status === 200) {
          setUserVault(result.data.password_vault);
          console.log("reduxState", UserVault);
        }
      } catch (error) {
        history.push("/signin");
        localStorage.removeItem("user");
      }
    });
  }, []);

  return (
    <Base>
      <div className="container ">
        <div className="d-flex ms-5 ms-sm-2">
          {UserVault.length > 0 ? (
            <div className="mt-5 row">
              {UserVault.map((passVault, id) => (
                <div className="col" key={id}>
                  <VaultCard
                    vaultItems={passVault}
                    setModelToggle={setModelToggle}
                    decryptItemsInModel={setModalVaultPassword}
                    onDeletePassVault={onDeletePassVault}
                    isCreateOrUpdate={setCreateOrUpdateToggle}
                    colorCode={id > 7 ? colorCodes[5] : colorCodes[id]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h4 className="mt-3">No Passwords Found</h4>
          )}
        </div>

        <button
          type="button"
          className="add-btn"
          data-bs-toggle="modal"
          data-bs-target="#testModal"
          onClick={() => {
            setPasswordVaultList(initialPasswordVaultValues);
            setCreateOrUpdateToggle(true);
          }}
        >
          <FaPlus />
        </button>

        <div
          className="modal fade"
          id="testModal"
          tabIndex="-1"
          aria-labelledby="testModalLabel"
          aria-hidden="true"
        >
          <PopUpModal
            modalTitle="Credentials"
            setModelToggle={setModelToggle}
            vaultItemsLabelList={passwordVaultItemsLabelList}
            vaultItems={passwordVaultItemsList}
            vaultList={passwordVaultList}
            inputHandler={onChangeInputHandler}
            onCreate={onSubmit}
            onUpdate={updateHandler}
            isCreateOrUpdate={createOrUpdateToggle}
          />
        </div>
      </div>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  UserVault: state.UserVault,
});

const mapDispatchToProps = (dispatch) => ({
  setUserVault: (uservault) => {
    dispatch(setUserVault(uservault));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);
