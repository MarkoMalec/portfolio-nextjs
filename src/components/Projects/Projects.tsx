import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useProjects from "@hooks/useProjects";
import Image from "next/image";
import StackIcons from "@assets/stack-icons.svg";
import { useParallaxEffect } from "@hooks/useMousePosition";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {

  const projects: any[] = useProjects();
  const parallax = useParallaxEffect(100);
  const projectSection = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (projectSection.current) {
      projectSection.current.onmousemove = (e) => {
        const projectCards = document.getElementsByClassName("project") as HTMLCollectionOf<HTMLElement>;
        for (const card of projectCards) {
          const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      };
    }
    const ctx = gsap.context(() => {
      gsap.set(".project", { scale: 0, opacity: 0 });

      ScrollTrigger.batch(".project", {
        start: "-100 bottom",
        onEnter: (batch) =>
          gsap.to(batch, { scale: 1, opacity: 1, stagger: 0.2 }),
        onEnterBack: (batch) =>
          gsap.to(batch, { scale: 1, opacity: 1, stagger: 0.2 }),
        onLeaveBack: (batch) =>
          gsap.to(batch, { scale: 0, opacity: 0, stagger: 0.2 }),
      });
    }, projectSection);
    return () => ctx.revert();
  }, [projects]);

  return (
    <section id="project_section" ref={projectSection}>
      <div className="container">
        {projects.slice(0, 4).map((el, i) => (
          <div className={`project project-${i}`} key={i}>
            <div className="project_info">
              <h3>{el.title}</h3>
              <p>{el.description}</p>
              <a
                href="#"
                className="btn cursor-hover-item"
                data-cursor-text="See more"
                data-cursor-text-repeat="20"
              >
                See more
              </a>
            </div>
            <div
              className="project_image-wrapper"
              style={i === 3 ? parallax : undefined}
            >
              {i === 3 ? (
                <Image src={StackIcons} alt="Stack Icons" />
              ) : (
                <img src={el.imageURL} alt={el.title} />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;