import React, { useLayoutEffect, useRef } from "react";
import { Project } from "~/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import StackIcons from "@assets/stack-icons.svg";
import { useParallaxEffect } from "@hooks/useMousePosition";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const parallax = useParallaxEffect(100);
  const projectSection = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (projectSection.current) {
      projectSection.current.onmousemove = (e) => {
        const projectCards = document.getElementsByClassName(
          "project"
        ) as HTMLCollectionOf<HTMLElement>;
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
        <h4 className="section-subtitle">Portfolio</h4>
        <h2 className="section-title">Recent Projects</h2>
        <div className="projects-grid">
          {projects
            .filter((el) => el.title !== "Nextjs portfolio")
            .slice(0, 3)
            .map((el, i) => (
              <div className={`project project-${i}`} key={el.id}>
                <div className="project_info">
                  <h3>{el.title}</h3>
                  <p>{el.excerpt}</p>
                  <a
                    href="#"
                    className="btn cursor-hover-item"
                    data-cursor-text="see more"
                    data-cursor-text-repeat="4"
                  >
                    see more
                  </a>
                </div>
                <div className="project_image-wrapper">
                  <Image
                    src={el.featuredPhoto}
                    alt={el.title}
                    width={900}
                    height={900}
                  />
                </div>
              </div>
            ))}

          {projects
            .filter((el) => el.title === "Nextjs portfolio")
            .map((el, i) => (
              <div className={`project project-3`} key={el.id}>
                <div className="project_info">
                  <h3>{el.title}</h3>
                  <p>{el.excerpt}</p>
                  <a
                    href="#"
                    className="btn cursor-hover-item"
                    data-cursor-text="see more"
                    data-cursor-text-repeat="4"
                  >
                    see more
                  </a>
                </div>
                <div className="project_image-wrapper" style={parallax}>
                  <Image src={StackIcons} alt="Stack Icons" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
