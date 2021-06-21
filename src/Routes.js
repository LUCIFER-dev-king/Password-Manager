import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signin' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}
