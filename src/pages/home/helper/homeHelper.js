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
