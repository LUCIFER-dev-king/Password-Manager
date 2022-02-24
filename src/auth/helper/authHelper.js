import { API } from "../../backend";
const axios = require("axios");

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
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
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
    withCredentials: true,
    data: JSON.stringify(user),
  })
    .then((res) => {
      if (res.status === 200) {
        if (typeof window !== undefined) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        return true;
      }
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
  next();
};

export const signOut = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("user");

    return axios({
      method: "get",
      url: `${API}/signout`,
    })
      .then((res) => {
        console.log("Sign Out successful");
        return true;
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};
