import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import BankAccount from "./pages/bankAccount/BankAccount";
import Home from "./pages/home/Home";
import Notes from "./pages/notes/Notes";
import Password from "./pages/password/Password";
import PrivateRoute from "./auth/PrivateRoute";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function Routes() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <PrivateRoute path="/password" exact component={Password} />
          <PrivateRoute path="/notes" exact component={Notes} />
          <PrivateRoute path="/bankaccount" exact component={BankAccount} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

//REACT_APP_BACKEND=https://epassbackend.herokuapp.com/api
