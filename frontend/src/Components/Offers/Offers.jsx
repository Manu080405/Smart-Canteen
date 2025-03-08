import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";
import exclu_can from "../Assets/exclu_can.webp"

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check now</button>
      </div>
      <div className="offers-right">
        <img src={exclu_can} alt="" />
      </div>
    </div>
  );
};

export default Offers;
