import React, { useContext, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import "./authentication.css";
import {
  authenticate,
  encryptMasterPassword,
  signIn,
} from "./helper/authHelper";
const { v4: uuidv4 } = require("uuid");

const SignIn = () => {
  const history = useHistory();
  var salt = uuidv4();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn({ email, password }).then((result) => {
      authenticate(result, () => {
        console.log("Signin Succesfull");
        history.push("/");
      });
    });
    // console.log(encryptMasterPassword(password,'ebe70491-fe4e-42f0-9140-51e9e4fb42f0'));
  };

  return (
    <div className='container fluid'>
      <div className='explore'>
        <Link to='/learn'>Explore</Link>
      </div>
      <div className='row'>
        <div className='col-md-4 offset-md-4 mt-5'>
          <section className='text-center'>
            <h1>Password Manager</h1>

            <h4 className='p-2'>Welcome Back</h4>

            <p>
              Don't have an account,
              <Link to='signup'>
                <a>Sign Up</a>
              </Link>
            </p>
          </section>

          <section className='p-4'>
            <form action=''>
              <label className='p-1' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='form-control p-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className='p-1 mt-2' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                className='form-control p-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type='button'
                onClick={handleSignIn}
                className='btn btn-secondary w-100 rounded mt-3'
              >
                Sign In
              </button>
            </form>
            <p className='mt-1 text-center'>
              <a href=''>Forgot password?</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
