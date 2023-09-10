import React from "react";

const Card: React.FC<{
  children: React.ReactNode;
  title: string;
  className?: string;
}> = ({ children, title, className }) => {
  return (
    <section className={`dashboard_card ${className ?? ""}`}>
      <h5>{title}</h5>
      <div className="dashboard_card--contents">{children}</div>
    </section>
  );
};

export default Card;
