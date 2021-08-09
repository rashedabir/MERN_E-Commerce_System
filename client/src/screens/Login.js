import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Error from "../component/Error";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://weshopbd.herokuapp.com/user/login", {
        email: email,
        password: password,
      });
      window.location.href = "/";
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const showPass = () => {
    let x = document.getElementById("exampleInputPassword1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <div className="login-form">
        <h3>login</h3>
        <form onSubmit={loginSubmit} autoComplete="off">
          <div className="email-box">
            <i className="fas fa-user"></i>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Email"
              autoComplete="off"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="password-box">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              autoComplete="off"
              id="exampleInputPassword1"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div class="form-check radio_button">
            <input
              className="form-check-input"
              type="checkbox"
              onClick={showPass}
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Show Password
            </label>
          </div>
          <div className="btn-box">
            <div className="register">
              <Link id="register" to="/register">
                registration
              </Link>
            </div>
            <div>
              <button id="login" type="submit" className="btn">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      {error === "" ? " " : <Error error={error} />}
    </>
  );
}

export default Login;
