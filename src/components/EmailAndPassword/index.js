import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fire } from "../../firebase/utils";
import ErrorMessage from "../ErrorMessage";
import ForgotPassword from "./../../assets/forgotPassword.svg";
const EmailAndPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleResetPassword = (emailValue) => {
    const config = {
      url: "http://localhost:3000/",
    };
    fire
      .auth()
      .sendPasswordResetEmail(emailValue, config)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    handleResetPassword(email);
  };
  return (
    <>
      <div className="settings">
        <span style={{ fontSize: 30 }}>Forgot your password</span>
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
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
        <span style={{ fontSize: 20 }}>
          <Link to="/">Continue to login</Link>
        </span>
      </div>
      <img src={ForgotPassword} className="banner" alt="quiz" />
    </>
  );
};

export default EmailAndPassword;
