import React, { Component } from "react";


import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem("userTokenTime") ? true : false
    };

    this.handleIsLogin = this.handleIsLogin.bind(this);
  }

  handleIsLogin(trueOrFalse) {
    console.log("I am here");
    this.setState({ isLogin: trueOrFalse });
  }

  render() {
    return (
      <div className="App">
        {/* <Navbar isLogin={this.state.isLogin} /> */}
        {/* this.state.isLogin && <Upload /> */}
        <Route exact path="/" component={Register} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/login"
          component={Login}
          isLogin={this.state.isLogin}
          handleIsLogin={this.handleIsLogin}
        />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/notfound" component={NotFound} />
      </div>
    );
  }
}

export default App;
