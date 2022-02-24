import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./authentication.css";
import { signIn } from "./helper/authHelper";

const SignIn = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (testemail, testpass) => {
    var credentails = {
      email: email === "" ? testemail : email,
      password: password === "" ? testpass : password,
    };
    signIn(credentails).then((result) => {
      if (result) {
        history.push("/");
      }
    });
  };

  return (
    <div className="container fluid">
      <div className="explore">
        <Link to="/learn">Explore</Link>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-5">
          <section className="text-center">
            <h1>Password Manager</h1>

            <h4 className="p-2">Welcome Back</h4>

            <p>
              Don't have an account,
              <Link to="signup">Sign Up</Link>
            </p>
          </section>

          <section className="p-4">
            <form action="">
              <label className="p-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="p-1 mt-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={handleSignIn}
                className="btn btn-secondary w-100 rounded mt-3"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail("test@test.com");
                  setPassword("123456");
                  handleSignIn("test@test.com", "123456");
                }}
                className="btn btn-secondary w-100 rounded mt-3"
              >
                Guest Login
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
