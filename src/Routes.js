import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Base from "./pages/core/Base";
import Home from "./pages/core/Home";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Base} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}
