import { API } from "../../../backend";
const axios = require("axios");
var pbkdf2 = require("pbkdf2");
const { v4: uuidv4 } = require("uuid");

export const signUp = (user) => {
  console.log(user);
  return axios({
    method: "post",
    url: `${API}/signup`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(user),
  })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};

export const signIn = (user) => {
  return axios({
    method: "post",
    url: `${API}/signin`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(user),
  })
    .then((res) => {
      if (res.status === 200) {
        const { _id, name, email, salt, password } = res.data.user;

        
        if (encryptMasterPassword(user.password, salt) === password) {
          console.log("Same");
        }
      }
    })
    .catch((err) => console.log(err));
};

export const encryptMasterPassword = (pass, salt) => {
  var key = pbkdf2.pbkdf2Sync(pass, "08eaefa0-c689-4772-bc2d-fc3f69f76f73", 1000, 32, "sha256");
  return key.toString("hex");
};