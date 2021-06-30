import { API } from "../../../backend";
const aes256 = require("aes256");
const axios = require("axios");

export const encryptValues = (key, value) => {
  return aes256.encrypt(key, value);
};

export const decryptValues = (key, value) => {
  return aes256.decrypt(key, value);
};

export const createPasswordVault = (userId, token, passwordValue) => {
  return axios({
    method: "put",
    url: `${API}/password/create/${userId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(passwordValue),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const getAPasswordVault = (userId, token, passwordValueId, key) => {
  return axios({
    method: "get",
    url: `${API}/password/${userId}/${passwordValueId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(decryptValues(key, res.data.site_password));
    })
    .catch((err) => console.log(err));
};

export const getPasswordVaults = (userId, token) => {
  return axios({
    method: "get",
    url: `${API}/user/${userId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data.password_vault;
    })
    .catch((err) => console.log(err));
};
