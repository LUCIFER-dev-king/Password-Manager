import { API } from "../../../backend";
import { encryptValues } from "../../../utils/encryptDecrypt";
const axios = require("axios");

export const createPasswordVault = async (userId, passwordVaultList) => {
  //Reason to use local obj is if we use {...passwordVaultList, [key]:value}
  //it generates a instance of an obj each time when loop runs.
  let enryptedPasswordList = {
    sitePassword: "",
    siteUrl: "",
    siteUsername: "",
    vaultName: "",
  };
  for (const [key, value] of Object.entries(passwordVaultList)) {
    if (key !== "vaultName") {
      let encryptedValue = await encryptValues(userId, value);
      enryptedPasswordList[key] = encryptedValue;
    } else {
      enryptedPasswordList[key] = value;
    }
  }
  return axios({
    method: "put",
    url: `${API}/password/create/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(enryptedPasswordList),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const updatePasswordVault = (userId, passwordValue) => {
  return axios({
    method: "put",
    url: `${API}/password/update/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(passwordValue),
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

export const deletePasswordVault = (userId, passwordValue) => {
  return axios({
    method: "delete",
    url: `${API}/password/remove/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(passwordValue),
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

export const getAPasswordVault = (userId, token, passwordValueId, key) => {
  return axios({
    method: "get",
    url: `${API}/password/${userId}/${passwordValueId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      // console.log(decryptValues(key, res.data.site_password));
    })
    .catch((err) => console.log(err));
};

export const getPasswordVaults = (userId) => {
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
