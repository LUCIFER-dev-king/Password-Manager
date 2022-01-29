import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import reportWebVitals from "./reportWebVitals";
//Completed: Add update function in password vault.
//Completed: Finish rest of the ui
//Reduce backend code with switch case.
//Completed: refrator modals.
//Completed: Generate pass and id.
//Add testing.
//Documnetn API
//Completed: Build chrome extenstion.
ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
