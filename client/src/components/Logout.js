import React from "react";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
  if (localStorage.getItem("userTokenTime")) {
    localStorage.removeItem("userTokenTime");
  }
  return <Redirect to="/login" />;
};

export default Logout;
