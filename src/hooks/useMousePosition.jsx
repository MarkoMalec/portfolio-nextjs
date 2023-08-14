import { useEffect, useState } from "react";

const useMousePosition = (lag = 0) => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    let targetX = null;
    let targetY = null;
    let currentX = null;
    let currentY = null;

    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      targetX = clientX;
      targetY = clientY;
    };

    const updatePosition = () => {
      if (currentX !== null && currentY !== null) {
        currentX += (targetX - currentX) * lag;
        currentY += (targetY - currentY) * lag;
        setMousePosition({ x: currentX, y: currentY });
      } else {
        currentX = targetX;
        currentY = targetY;
      }

      requestAnimationFrame(updatePosition);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    updatePosition();

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [lag]);

  return mousePosition;
};

const useParallaxEffect = (intensity) => {
  const { x, y } = useMousePosition(1);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (!intensity) {
      console.error("****No intensity parameter passed in useParallaxEffect hook.");
      return;
    }
    const handleMouseMove = () => {
      const { clientWidth, clientHeight } = document.documentElement;
      const offsetX = (x - clientWidth / 2) / intensity;
      const offsetY = (y - clientHeight / 2) / intensity;

      setStyle({
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        // transition: 'transform .5s'
      });
    };

    handleMouseMove();

    return () => {};
  }, [x, y]);

  return style;
};

export { useMousePosition, useParallaxEffect };