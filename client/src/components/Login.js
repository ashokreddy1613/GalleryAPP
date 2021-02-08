import React, { Component } from "react";
import axios from "axios";
import "./Login.css";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      token: " ",
      redirect: localStorage.getItem("userTokenTime") ? true : false,
      errmsg: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    axios
      .post("https://gallery-pp.herokuapp.com/user/login", {
        email: email,
        password: password
      })
      .then((response) => {
        this.setState({
          token: response.data.token
        });
        const data = {
          token: this.state.token,
          time: new Date().getTime(),
          eamil: this.state.email
        };
        localStorage.setItem("userTokenTime", JSON.stringify(data));
        this.setState({
          redirect: true
        });
      })
      .catch((err) => {
        this.setState({
          errmsg: err.message
        });
      });
  }
  render() {
    if (this.state.redirect) return <Redirect to="/dashboard" />;

    return (
      <div>
        <Navbar isLogin={this.state.isLogin} />
        <div className="Signin">
          <form onSubmit={this.handleSubmit}>
            <h2 className="title">Log In</h2>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <br />

            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <br />
            <button type="submit" value="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
