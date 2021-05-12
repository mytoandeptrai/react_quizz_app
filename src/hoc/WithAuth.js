import React, { useEffect } from "react";
import { useHistory } from "react-router";

const WithAuth = (props) => {
  const { currentUser } = props;
  const history = useHistory();
  const email = currentUser && currentUser.email;
  console.log(email);
  useEffect(() => {
    if (!email) {
      history.push("/");
    }
  }, [email]);
  return <>{props.children}</>;
};

export default WithAuth;
