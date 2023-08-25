import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceData {
  id: number;
  company: string;
  timeframe: string;
  description: string;
  skills: string;
}

interface VerticalTimelineProps {
  data?: ExperienceData[];
}

const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ data = [] }) => {
  const lineRef = useRef(null);
  const horizontalLine = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "100 60%",
          end: "bottom 60%",
          scrub: 2,
        },
      });

      tl.to(lineRef.current, {
        duration: 2,
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
      });

      gsap.set(".timeline-entry", { opacity: 0 });
      const timelineBoxes = gsap.utils.toArray(".timeline-entry") as Element[];
      timelineBoxes.forEach((timelineBox) => {
        gsap.to(timelineBox, {
          opacity: 1,
          scrollTrigger: {
            trigger: timelineBox,
            start: "100 60%",
            toggleActions: "play resume none none",
          },
        });
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  if (!data) {
    return <>In development</>
  }

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div className="guide-line" />
      <div className="thin-line" ref={lineRef} />
      {data.map((item, index) => (
        <div key={index} className={`timeline-entry`}>
          <div className="cube_wrapper">
            <div className="box">
              <div className={`cube ${item.company}`}>
                <div className="front" />
                <div className="back" />
                <div className="right" />
                <div className="left" />
                <div className="top" />
                <div className="bottom" />
              </div>
            </div>
          </div>
          <div className="text-box">
            <h4>{item.company}</h4>
            <p className="date">{item.timeframe}</p>
            <p className="skill_description">{item.description}</p>
            <div className="skills_used">
              {/* {item.skills.map((skill, i) => (
                <span key={i}>{skill}</span>
              ))} */}
            </div>
          </div>
        </div>
      ))}
      <div className="horizontal-line" ref={horizontalLine} />
    </div>
  );
};

export default VerticalTimeline;
