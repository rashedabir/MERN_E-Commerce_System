import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Error from "../component/Error";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", {
        name: name,
        email: email,
        password: password,
        rePassword: rePassword,
      });

      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const showPass = () => {
    let x = document.getElementById("exampleInputPassword1");
    let y = document.getElementById("exampleInputPassword2");
    if (x.type === "password" && y.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  };

  return (
    <>
      <div className="login-form">
        <h3>register</h3>
        <form onSubmit={registerSubmit} autoComplete="off">
          <div className="email-box">
            <i className="fas fa-user"></i>
            <input
              className="form-control"
              placeholder="Full Name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="email-box">
            <i className="fas fa-envelope" style={{ fontSize: "28px" }}></i>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Email"
              autoComplete="off"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="password-box">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              className="form-control"
              placeholder="Re-type Password"
              autoComplete="off"
              id="exampleInputPassword2"
              onChange={(e) => setRePassword(e.target.value)}
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
              Show Passwords
            </label>
          </div>
          <div className="btn-box">
            <div className="register">
              <Link id="register" to="/login">
                login here
              </Link>
            </div>
            <div>
              <button id="login" type="submit" className="btn">
                register
              </button>
            </div>
          </div>
        </form>
      </div>
      {error === "" ? "" : <Error error={error} />}
    </>
  );
}

export default Registration;
