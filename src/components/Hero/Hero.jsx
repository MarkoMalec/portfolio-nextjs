import React from "react";
import { useParallaxEffect } from "~/hooks/useMousePosition";
// import "./Hero.scss";

const Hero = () => {
  // const parallaxStyle = useParallaxEffect(50);

  return (
    <div className="hero-wrapper">
      <div className="hero-inner">
        <div className="particle square" style={useParallaxEffect(60)} />
        <div className="particle square small" style={useParallaxEffect(50)} />
        <div className="particle line" style={useParallaxEffect(90)} />
        <div className="particle circle" style={useParallaxEffect(70)} />
        <div className="container">
          <h4>WELCOME I'M</h4>
          <h1>Marko Malec</h1>
          <p>
            Enthusiastic web developer with a passion for front-end
            <br /> with big interest in back-end, based in Arnhem, NL
          </p>
          <a
            href="#"
            className="btn cursor-hover-item"
            data-cursor-text="JUST SCROLL"
            data-cursor-text-repeat="3"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
