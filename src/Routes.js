import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Address from "./pages/address/Address";
import BankAccount from "./pages/bankAccount/BankAccount";
import Home from "./pages/home/Home";
import Notes from "./pages/notes/Notes";
import Password from "./pages/password/Password";
import PaymentCards from "./pages/paymentCards/PaymentCards";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/password' exact component={Password} />
        <Route path='/notes' exact component={Notes} />
        <Route path='/address' exact component={Address} />
        <Route path='/paymentcards' exact component={PaymentCards} />
        <Route path='/bankaccount' exact component={BankAccount} />
      </Switch>
    </BrowserRouter>
  );
}
