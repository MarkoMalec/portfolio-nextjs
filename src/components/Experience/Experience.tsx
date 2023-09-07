import React from "react";
import { ExperienceType } from "~/types";
import VerticalTimeline from "./VerticalTimeline";
import { useParallaxEffect } from "@hooks/useMousePosition";

interface ExperiencesProps {
  data: ExperienceType[];
}

const Experience = ({ data }: ExperiencesProps) => {
  const parallaxStyle = useParallaxEffect(20);

  return (
    <section id="experience_wrapper">
      <div className="gradients-container">
        <div className="blur-gradient" style={parallaxStyle} />
        <div className="blur-gradient-left" style={parallaxStyle} />
        <div className="reactive-gradient" style={parallaxStyle} />
      </div>
      <div className="container">
        <h4 className="section-subtitle">Work</h4>
        <h2 className="section-title">My Experience</h2>
        <VerticalTimeline data={data} />
      </div>
    </section>
  );
};

export default Experience;
