import React from "react";
import Upload from "./Upload";
import Navbar from "./Navbar";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [images, setImages] = React.useState([]);
  const [isLogin, setIsLogin] = React.useState(
    localStorage.getItem("userTokenTime") ? true : false
  );
  React.useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    axios.get("http://localhost:5000/user/images").then((res) => {
      res.data.map((image) => {
        setImages((prevState) => [...prevState, image.fileLink]);
      });
    });
  };
  const encode = (data) => {
    let buf = Buffer.from(data);
    let base64 = buf.toString("base64");
    return base64;
  };
  return (
    <div>
      <Navbar isLogin={isLogin} />
      <Upload />
      <h1> Images </h1>
      {images.map((image, index) => {
        return (
          <imgContainer>
            <imgDiv>
              <img src={image} />
              <span>Image {index}</span>
            </imgDiv>
          </imgContainer>
        );
      })}
    </div>
  );
};

export default Dashboard;
