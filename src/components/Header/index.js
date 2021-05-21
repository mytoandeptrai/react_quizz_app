import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Header = () => {
  return (
    <div className="header">
      <span className="title">Welcome to our quiz app</span>
      <hr className="divider" />
    </div>
  );
};

export default Header;
