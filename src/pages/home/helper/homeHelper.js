import { API } from "../../../backend";
const axios = require("axios");

export const getUser = (userId, token) => {
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
      return res.data;
    })
    .catch((err) => console.log(err));
};
