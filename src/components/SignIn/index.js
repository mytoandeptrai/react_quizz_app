import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./style.css";
import Login from "../../assets/login.svg";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { fire } from "../../firebase/utils";
const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignInWithFirebase = (emailValue, passwordValue) => {
    fire
      .auth()
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
        history.push("/home");
        localStorage.setItem("isLogin", "true");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        resetForm();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    handleSignInWithFirebase(email, password);
    resetForm();
  };

  return (
    <>
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quizz Login</span>
        <div className="settings__select">
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <form onSubmit={handleSubmit}>
            <TextField
              type="email"
              label="Enter your Email"
              variant="outlined"
              style={{ marginBottom: 25 }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Enter your Password"
              variant="outlined"
              style={{ marginBottom: 25 }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Login
            </Button>
          </form>
          <div className="settings__links">
            <span style={{ fontSize: 20 }}>
              You don't have an account ?{" "}
              <Link to="/registration">Register</Link>
            </span>
            <span style={{ fontSize: 20 }}>
              <Link to="/recovery">Forgot your password ?</Link>
            </span>
          </div>
        </div>
      </div>
      <img src={Login} className="banner" alt="quiz" />
    </>
  );
};

export default SignIn;
