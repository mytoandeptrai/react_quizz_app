import React, { useEffect } from "react";
import { useHistory } from "react-router";

const WithAuth = (props) => {
  const { currentUser } = props;
  const history = useHistory();
  const email = currentUser && currentUser.email;
  const isChecking = localStorage.getItem("isLogin") || false;
  useEffect(() => {
    if (!isChecking) {
      history.push("/");
    }
  }, [isChecking]);
  return <>{props.children}</>;
};

export default WithAuth;
