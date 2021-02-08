import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Picture: "",
      errMsg: "",
      resMsg: "",
      errSize: ""
    };
    this.imageHandler = this.imageHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  maxfile = (e) => {
    let files = e.target.files[0];
    if (files.length > 1) return false;
    else {
      if (files.size > 5000000) {
        this.setState({
          errSize: "File is too large, it should be less than 5MB"
        });
        return false;
      }
      return true;
    }
  };
  imageHandler = (e) => {
    const files = e.target.files[0];
    console.log("image file", files);
    if (this.maxfile(e)) {
      this.setState({
        Picture: e.target.files[0]
      });
    }
  };

  submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", this.state.Picture, this.state.Picture.name);

    if (!(URL === " ")) {
      axios
        .post("http://localhost:5000/user/upload", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("userTokenTime")).token
          }
        })
        .then((res) => {
          this.setState({
            resMsg: "Image Uploaded Sucessfully"
          });
        })
        .catch((err) => {
          this.setState({
            errMsg: err.message
          });
        });
    } else {
      alert("Please upload valid picture");
    }
  };

  render() {
    //Handling error messages
    if (this.state.errMsg)
      return (
        <div>
          <h3>{this.state.errMsg}</h3>
        </div>
      );

    //Handling success response messages
    if (this.state.resMsg)
      return (
        <div>
          <h3>{this.state.resMsg}</h3>
        </div>
      );

    //Handling large files
    if (this.state.errSize)
      return (
        <div>
          <h3>{this.state.errSize}</h3>
        </div>
      );

    return (
      <form
        onSubmit={this.submitHandler.bind(this)}
        encType="multipart/form-data"
      >
        {/* <Navbar /> */}

        <h1>Upload</h1>
        <br />
        <input
          type="file"
          name="Picture"
          accept="image/*"
          onChange={this.imageHandler}
          required
        />

        <button type="submit" onClick={this.submitHandler}>
          Upload
        </button>
      </form>
    );
  }
}

export default Upload;
