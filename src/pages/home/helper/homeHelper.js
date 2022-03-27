import { API } from "../../../backend";
const axios = require("axios");

export const getUser = (userId) => {
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

export const createCategoryVault = (userId, name) => {
  return axios({
    method: "post",
    url: `${API}/category/create/${userId}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(name),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("Category created");
        // console.log(result.data.password_vault);
        return res;
      }
      console.log(res);
    })
    .catch((err) => console.log(err));
};
