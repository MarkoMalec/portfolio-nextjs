import React from "react";
import DevIcon from "@hooks/DevIcon";

const Stack = () => {
  return (
    <section id="stack_section">
      <div className="container">
        <h4 className="section-subtitle">Tech & Tools</h4>
        <h2 className="section-title">My Tech</h2>
        <div className="stack-icon-grid">
          <div><DevIcon icon="html5" /></div>
          <div><DevIcon icon="css3" /></div>
          <div><DevIcon icon="tailwindcss" /></div>
          <div><DevIcon icon="sass" /></div>
          <div><DevIcon icon="react" /></div>
          <div><DevIcon icon="nextjs" /></div>
          <div><DevIcon icon="typescript" /></div>
          <div><DevIcon icon="redux" /></div>
          <div><DevIcon icon="nodejs" /></div>
          <div><DevIcon icon="jquery" /></div>
          <div><DevIcon icon="git" /></div>
          <div><DevIcon icon="php" /></div>
          <div><DevIcon icon="docker" /></div>
          <div><DevIcon icon="vscode" /></div>
          <div><DevIcon icon="figma" /></div>
          <div><DevIcon icon="wordpress" /></div>
        </div>
      </div>
    </section>
  );
};

export default Stack;
