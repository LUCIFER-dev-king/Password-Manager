import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/helper/authHelper";
import { FaPlus } from "react-icons/fa";
import { decryptValues } from "../../utils/encryptDecrypt";
import VaultCard from "../../component/VaultCard";
import { setUserVault } from "../../redux/actions";
import { connect } from "react-redux";
import PopUpModal from "../../component/PopUpModal";
import Base from "../../core/Base";
import {
  updateNotesVault,
  deleteNotesVault,
  getNotesVaults,
  createNotesVault,
} from "./helper/notesHelper";
import { useHistory } from "react-router";

const Notes = ({ setUserVault, UserVault }) => {
  const { _id } = isAuthenticated();
  const history = useHistory();
  const [modelToggle, setModelToggle] = useState(false);
  const [createOrUpdateToggle, setCreateOrUpdateToggle] = useState(false);
  const notesVaultItemsList = ["notes", "vaultName"];
  const initialNotesVaultValues = {
    notes: "",
    vaultName: "",
  };
  const [notesVaultList, setNotesVaultList] = useState(initialNotesVaultValues);
  const onChangeInputHandler = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setNotesVaultList({
      ...notesVaultList,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    createNotesVault(_id, notesVaultList).then((result) => {
      if (result.status === 200) {
        console.log("Encryption saved successful");
        // console.log(result.data.password_vault);
        setUserVault(result.data.notes_vault);
      } else if (result.status === 403) {
        history.push("/signin");
      }
    });
  };

  const setModalVaultPassword = async (notesVault) => {
    let decryptedObject = {
      _id: "",
      notes: "",
      vaultName: "",
    };
    for (const [key, value] of Object.entries(notesVault)) {
      if (key === "_id" || key === "vaultName") {
        decryptedObject[key] = value;
      } else {
        let decryptedValue = await decryptValues(_id, value);
        decryptedObject[key] = decryptedValue;
      }
    }
    console.log(decryptedObject);
    setNotesVaultList(decryptedObject);
  };

  const onDeleteNotesVault = (vault) => {
    deleteNotesVault(_id, vault).then((result) => {
      if (result.status === 200) {
        setUserVault(result.data.notes_vault);
      }
    });
  };

  const updateHandler = () => {
    updateNotesVault(_id, notesVaultList).then((res) => {
      if (res.status === 200) {
        setUserVault(res.data.notes_vault);
      }
    });
  };

  useEffect(() => {
    getNotesVaults(_id).then((result) => {
      try {
        if (result.status === 200) {
          setUserVault(result.data.notes_vault);
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
      <div className="container">
        <div className="d-flex ms-5 ms-sm-2">
          {UserVault.length > 0 ? (
            <div className="mt-5 row">
              {UserVault.map((notesVault, id) => (
                <div
                  data-bs-toggle={modelToggle ? "modal" : ""}
                  data-bs-target={modelToggle ? "#testModal" : ""}
                  key={id}
                  className="col"
                >
                  <VaultCard
                    vaultItems={notesVault}
                    setModelToggle={setModelToggle}
                    decryptItemsInModel={setModalVaultPassword}
                    onDeletePassVault={onDeleteNotesVault}
                    isCreateOrUpdate={setCreateOrUpdateToggle}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h4>No Notes Found</h4>
          )}
        </div>
        {/**/}

        <button
          type="button"
          className="add-btn"
          data-bs-toggle="modal"
          data-bs-target="#testModal"
          onClick={() => {
            setNotesVaultList(initialNotesVaultValues);
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
            vaultItems={notesVaultItemsList}
            vaultList={notesVaultList}
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

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
