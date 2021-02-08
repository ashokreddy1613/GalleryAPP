import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      password: "",
      successMsg: "",
      failureMsg: "",
      Redirect: false
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
    const { fullName, email, password } = this.state;
    axios
      .post("http://localhost:5000/user/signup", {
        fullName: fullName,
        email: email,
        password: password
      })
      .then((response) => {
        this.setState({
          successMsg: response.data.message
        }).then(() => this.setState({ redirect: true }));
      })
      .catch((error) => {
        this.setState({
          failureMsg: error.message
        });
      });
  }
  render() {
    if (this.state.redirect) return <Redirect to="/login" />;

    return (
      <div>
        <Navbar isLogin={this.state.isLogin} />
        <div className="Signup">
          <form onSubmit={this.handleSubmit}>
            <h2 className="title">Register</h2>
            <br />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={this.handleChange}
              value={this.state.fullName}
            />
            <br />

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

export default Register;
