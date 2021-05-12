import React from "react";
import "./style.css";
const MainLayout = (props) => {
  return (
    <div className="content">
      {props.children}
    </div>
  );
};

export default MainLayout;
