import React from "react";
import "./Hero.css";
import hero_image from "../Assets/hero_image.png";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_can from "../Assets/hero_can.jpg"
import hero_can1 from "../Assets/hero_can1.avif"
import { useNavigate } from "react-router-dom"; // Import useNavigate



const Hero = () => {
  const navigate = useNavigate(); // Initialize navigation function

  const handleExploreClick = () => {
    navigate("/collection"); // Navigate to the "Explore" page
  };
  
  return (
    <div className="hero">
      <div className="hero-left">
        <h2></h2>
        <div>
          <div className="hero-hand-icon">
            <p>order</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>with us</p>
          <p>your favourite food</p>
        </div>
        <div className="hero-latest-btn">
          <div>EXPLORE
          <button onClick={handleExploreClick}></button> 
          </div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_can1} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
