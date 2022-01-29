import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/helper/authHelper";
import { FaPlus } from "react-icons/fa";
import { decryptValues, encryptValues } from "../../utils/encryptDecrypt";
import VaultCard from "../../component/VaultCard";
import { setUserVault } from "../../redux/actions";
import { connect } from "react-redux";
import PopUpModal from "../../component/PopUpModal";
import Base from "../../core/Base";
import {
  getBankVaults,
  createBankVault,
  deleteBankVault,
  updateBankVault,
} from "./helper/bankAccountHelper";
import { useHistory } from "react-router";

const BankAccount = ({ setUserVault, UserVault }) => {
  const { _id } = isAuthenticated();
  const history = useHistory();
  const [modelToggle, setModelToggle] = useState(false);
  const [createOrUpdateToggle, setCreateOrUpdateToggle] = useState(false);
  const bankVaultItemsList = [
    "bankName",
    "vaultName",
    "accountType",
    "accountNumber",
    "micrCode",
    "customerId",
  ];
  const initialBankVaultValues = {
    bankName: "",
    accountType: "",
    accountNumber: "",
    micrCode: "",
    customerId: "",
    vaultName: "",
  };
  const [bankVaultList, setBankVaultList] = useState(initialBankVaultValues);
  const onChangeInputHandler = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setBankVaultList({
      ...bankVaultList,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    createBankVault(_id, bankVaultList).then((result) => {
      try {
        if (result.status === 200) {
          setUserVault(result.data.bank_account_vault);
          setModelToggle(false);
        }
      } catch (error) {
        history.push("/signin");
        localStorage.removeItem("user");
      }
    });
  };

  const setModalVaultPassword = async (bankVault) => {
    let decryptedObject = {
      bankName: "",
      accountType: "",
      accountNumber: "",
      micrCode: "",
      customerId: "",
      vaultName: "",
    };
    for (const [key, value] of Object.entries(bankVault)) {
      if (key === "_id" || key === "vaultName") {
        decryptedObject[key] = value;
      } else {
        let decryptedValue = await decryptValues(_id, value);
        decryptedObject[key] = decryptedValue;
      }
    }
    setBankVaultList(decryptedObject);
  };

  const onDeleteBankVault = (vault) => {
    deleteBankVault(_id, vault).then((result) => {
      if (result.status === 200) {
        setUserVault(result.data.bank_account_vault);
        setModelToggle(false);
      }
    });
  };

  const updateHandler = async () => {
    const encryptedBankVaultValues = {
      bankName: "",
      accountType: "",
      accountNumber: "",
      micrCode: "",
      customerId: "",
      vaultName: "",
    };
    for (const [key, value] of Object.entries(bankVaultList)) {
      if (key === "_id" || key === "vaultName") {
        encryptedBankVaultValues[key] = value;
      } else {
        let encryptedValue = await encryptValues(_id, value);
        encryptedBankVaultValues[key] = encryptedValue;
      }
    }
    updateBankVault(_id, encryptedBankVaultValues).then((res) => {
      if (res.status === 200) {
        setUserVault(res.data.bank_account_vault);
        setModelToggle(false);
      }
    });
  };

  useEffect(() => {
    getBankVaults(_id).then((result) => {
      if (result) {
        setUserVault(result);
        console.log("reduxState", UserVault);
      } else if (result.status === 403) {
        history.push("/signin");
      }
    });
  }, []);
  return (
    <Base>
      <div className="container">
        <div className="d-flex ms-5 ms-sm-2">
          {UserVault.length > 0 ? (
            <div className="mt-5 row">
              {UserVault.map((bankVault, id) => (
                <div
                  className="col"
                  data-bs-toggle={modelToggle ? "modal" : ""}
                  data-bs-target={modelToggle ? "#testModal" : ""}
                  key={id}
                >
                  <VaultCard
                    vaultItems={bankVault}
                    setModelToggle={setModelToggle}
                    decryptItemsInModel={setModalVaultPassword}
                    onDeletePassVault={onDeleteBankVault}
                    isCreateOrUpdate={setCreateOrUpdateToggle}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h4>No Account details Found</h4>
          )}
        </div>

        <button
          type="button"
          className="add-btn"
          data-bs-toggle="modal"
          data-bs-target="#testModal"
          onClick={() => {
            setBankVaultList(initialBankVaultValues);
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
            vaultItems={bankVaultItemsList}
            vaultList={bankVaultList}
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

export default connect(mapStateToProps, mapDispatchToProps)(BankAccount);
