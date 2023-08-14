import React from "react";
import VerticalTimeline from "./VerticalTimeline";
import { useParallaxEffect } from "@hooks/useMousePosition";

const Experience = ({ data = [] }) => {
  const parallaxStyle = useParallaxEffect(20);

  return (
    <section id="experience_wrapper">
      <div className="blur-gradient" style={parallaxStyle} />
      <div className="blur-gradient-left" style={parallaxStyle} />
      <div className="reactive-gradient" style={parallaxStyle} />
      <div className="container">
        <VerticalTimeline data={data} />
      </div>
    </section>
  );
};

export default Experience;
