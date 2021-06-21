import React, { useState, useContext } from "react";
import { signUp } from "./helper/authHelper";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    signUp({ name, email, password }).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className='container fluid'>
      <div className='explore'>
        <Link to='/learn'>Explore</Link>
      </div>
      <div className='row'>
        <div className='col-md-4 offset-md-4 mt-5'>
          <section className='text-center'>
            <h1>E-LEARN</h1>

            <h4 className='p-2'>Create your account</h4>

            <p>
              Already have an account,
              <Link to='signin'>
                <a>Sign Up</a>
              </Link>
            </p>
          </section>

          <section className='p-4'>
            <form action=''>
              <label className='p-1' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                className='form-control p-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              {/*TODO: value for checkbox is not added */}
              <input
                type='checkbox'
                className='form-checkbox-input'
                value={isAdmin}
                onChange={(e) => setIsAdmin((prev) => !prev)}
                id='checkBox'
              />
              <label htmlFor='checkBox' className='form-check-box px-2 pt-2'>
                Are your admin?
              </label>
              <button
                type='button'
                className='btn btn-secondary w-100 rounded mt-3'
                onClick={handleSignUpSubmit}
              >
                Sign Up
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

export default SignUp;
