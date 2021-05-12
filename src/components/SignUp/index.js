import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fire } from "../../firebase/utils";
import ErrorMessage from "../ErrorMessage/index";
import Create from "./../../assets/create.svg";
import "./style.css";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAddress("");
    setError("");
  };
  const handleSignUpWithFirebase = (emailValue, passwordValue) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
        history.push("/home");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Your password and confirmPassword do not match !");
    }
    handleSignUpWithFirebase(email, password);
    resetForm();
  };

  const handleShowError = () => {
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    } else if (errorMessage) {
      return <ErrorMessage>{errorMessage}</ErrorMessage>;
    }
  };
  return (
    <>
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quizz Login</span>
        <div className="settings__select">
          {handleShowError()}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter your Email"
              type="email"
              variant="outlined"
              style={{ marginBottom: 25 }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Enter your Password"
              type="password"
              variant="outlined"
              style={{ marginBottom: 25 }}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="Enter your Confirm Password"
              type="password"
              variant="outlined"
              style={{ marginBottom: 25 }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <TextField
              label="Enter your Address"
              type="text"
              variant="outlined"
              style={{ marginBottom: 25 }}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
        <span style={{ fontSize: 20 }}>
          You have an account ? <Link to="/">Login</Link>
        </span>
      </div>
      <img src={Create} className="banner" alt="quiz" />
    </>
  );
};

export default SignUp;
