import React from "react";
import "./Home.css";
import IMG from "../../assets/img/logo-celsa-home.png";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="container">
      <div className="container_box">
        <img className="container_box-img" src={IMG} alt="Logo Celsa Light" />
        <Link to="/register">
          <button className="container_box-btn">Comenzar</button>
        </Link>
      </div>
    </div>
  );
};
