import React from "react";
// import "./Hero.scss";

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-inner">
        <div className="container">
          <h4>WELCOME I'M</h4>
          <h1>Marko Malec</h1>
          <p>Enthusiastic web developer with a passion for front-end<br /> with big interest in back-end, based in Arnhem, NL</p>
          <a href="#" className="btn cursor-hover-item"
          data-cursor-text="JUST SCROLL"
          data-cursor-text-repeat="3">Learn more</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;