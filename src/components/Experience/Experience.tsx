import React from "react";
import VerticalTimeline from "./VerticalTimeline";
import { useParallaxEffect } from "@hooks/useMousePosition";

interface ExperienceData {
  id: number;
  company: string;
  timeframe: string;
  description: string;
  skills: string;
}

interface ExperienceProps {
  data?: ExperienceData[];
}

const Experience: React.FC<ExperienceProps> = ({ data = [] }) => {
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
