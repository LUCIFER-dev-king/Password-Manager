import { API } from "../../../backend";
const axios = require("axios");

export const searchQuery = (id, searchText) => {
  return axios({
    method: "post",
    url: `${API}/password/search/${id}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ vaultName: searchText }),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("Search Results");
        // console.log(result.data.password_vault);
        return res;
      }
      console.log(res);
    })
    .catch((err) => console.log(err));
};
