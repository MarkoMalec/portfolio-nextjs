import React, { useEffect, useRef } from "react";

const Card: React.FC<{
  children: React.ReactNode;
  title: string;
  className?: string;
  size?: "xxl" | "xl" | "lg" | "md" | "sm";
}> = ({ children, title, className, size }) => {
  const parentCardRef = useRef(null);
  const innerCardRef = useRef(null);

  useEffect(() => {
    const parentCardElement = parentCardRef.current as null | HTMLElement;
    const innerCardElement = innerCardRef.current as null | HTMLElement;

    const handleScroll = () => {
      if (innerCardElement) {
        if (
          innerCardElement.scrollTop + innerCardElement.clientHeight >=
          innerCardElement.scrollHeight
        ) {
          innerCardElement.classList.add("reached-bottom");
        } else {
          innerCardElement.classList.remove("reached-bottom");
        }
      }
    };

    if (innerCardElement) {
      innerCardElement.addEventListener("scroll", handleScroll);
    }

    if (innerCardElement && parentCardElement) {
      // Check if there is no scroll bar
      if (innerCardElement.scrollHeight <= parentCardElement.clientHeight) {
        parentCardElement.classList.remove("overlay");
        innerCardElement.classList.add("no-scroll");
      } else {
        parentCardElement.classList.add("overlay");
        innerCardElement.classList.remove("no-scroll");
      }
    }
    return () => {
      if (innerCardElement) {
        innerCardElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section
      ref={parentCardRef}
      className={`dashboard_card ${className ?? ""}`}
      style={{
        maxWidth: `${
          size === "xxl"
            ? "900px"
            : size === "xl"
            ? "700px"
            : size === "lg"
            ? "600px"
            : size === "md"
            ? "420px"
            : size === "sm"
            ? "200px"
            : "600px"
        }`,
      }}
    >
      <h5>{title}</h5>
      <div ref={innerCardRef} className="dashboard_card--contents">
        {children}
      </div>
    </section>
  );
};

export default Card;
