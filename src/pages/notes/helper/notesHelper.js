import { API } from "../../../backend";
import { encryptValues } from "../../../utils/encryptDecrypt";
const axios = require("axios");

export const getNotesVaults = (userId) => {
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
      return res;
    })
    .catch((err) => console.log(err));
};

export const createNotesVault = async (userId, notesVaultList) => {
  const encryptedNotesVaultValues = {
    notes: "",
    vaultName: "",
  };
  for (const [key, value] of Object.entries(notesVaultList)) {
    if (key !== "vaultName") {
      let encryptedValue = await encryptValues(userId, value);
      encryptedNotesVaultValues[key] = encryptedValue;
    } else {
      encryptedNotesVaultValues[key] = value;
    }
  }

  return axios({
    method: "put",
    url: `${API}/notes/create/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(encryptedNotesVaultValues),
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

export const deleteNotesVault = (userId, notesValue) => {
  return axios({
    method: "delete",
    url: `${API}/notes/remove/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(notesValue),
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

export const updateNotesVault = async (userId, notesValue) => {
  const encryptedNotesVaultValues = {
    _id: "",
    notes: "",
    vaultName: "",
  };
  for (const [key, value] of Object.entries(notesValue)) {
    if (key === "_id" || key === "vaultName") {
      encryptedNotesVaultValues[key] = value;
    } else {
      let encryptedValue = await encryptValues(userId, value);
      encryptedNotesVaultValues[key] = encryptedValue;
    }
  }
  return axios({
    method: "put",
    url: `${API}/notes/update/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(encryptedNotesVaultValues),
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
