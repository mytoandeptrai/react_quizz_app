import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Header = () => {
  return (
    <div className="header">
      <Link className="title" to="/">
        Welcome to our quizz app
      </Link>
      <hr className="divider" />
    </div>
  );
};

export default Header;
