import React, { Component } from "react";
import "./Navbar.css";

const Navbar = ({ isLogin }) => {
  //  const [isLogin, setIsLogin] = React.useState(false);

  // React.useEffect(() => {
  //   const user = localStorage.getItem("userTokenTime");
  //   if (user) setIsLogin(true);
  // });
  //console.log("nav bar isLogin", isLogin);
  return (
    <div className="Navbar">
      <div className="Navbar_left">
        <a href="/register">Photo Gallery</a>
      </div>
      <div className="Navbar_right">
        {!isLogin && <a href="register">Register</a>}
        {!isLogin && <a href="login">Login</a>}
        {isLogin && <a href="logout">Logout</a>}
      </div>
    </div>
  );
};

export default Navbar;
