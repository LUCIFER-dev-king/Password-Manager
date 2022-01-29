import { API } from "../../../backend";
import { encryptValues } from "../../../utils/encryptDecrypt";
const axios = require("axios");

export const getBankVaults = (userId) => {
  return axios({
    method: "get",
    url: `${API}/user/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.data.bank_account_vault;
    })
    .catch((err) => console.log(err));
};

export const createBankVault = async (userId, bankVaultList) => {
  const encryptedBankVaultValues = {
    bankName: "",
    accountType: "",
    accountNumber: "",
    micrCode: "",
    customerId: "",
    vaultName: "",
  };
  for (const [key, value] of Object.entries(bankVaultList)) {
    if (key !== "vaultName") {
      let encryptedValue = await encryptValues(userId, value);
      encryptedBankVaultValues[key] = encryptedValue;
    } else {
      encryptedBankVaultValues[key] = value;
    }
  }
  return axios({
    method: "put",
    url: `${API}/bankaccount/create/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(encryptedBankVaultValues),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("Encryption saved successful");
        // console.log(result.data.password_vault);
        return res;
      }
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const deleteBankVault = (userId, bankValue) => {
  return axios({
    method: "delete",
    url: `${API}/bankaccount/remove/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(bankValue),
  })
    .then((res) => {
      if (res.status === 200) {
        // console.log("Delete successful");
        console.log(res.data);
        return res;
      }
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const updateBankVault = (userId, bankValue) => {
  return axios({
    method: "put",
    url: `${API}/bankaccount/update/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(bankValue),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("updation successful");
        // console.log(result.data.password_vault);
        return res;
      }
      console.log(res);
    })
    .catch((err) => console.log(err));
};
