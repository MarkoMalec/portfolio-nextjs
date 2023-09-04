import React, { useRef } from "react";
import { useContext } from "react";
import { useMousePosition } from "@hooks/useMousePosition";
import { MouseContext } from "@context/MouseContext";
import useSpinningTextCursor from "@hooks/useSpinningTextCursor";

const Cursor = () => {
  const { cursorType } = useContext(MouseContext);
  const { x: dotX, y: dotY } = useMousePosition(1);
  const { x: ringX, y: ringY } = useMousePosition(0.2); //control the lag

  const cursorWrapperRef = useRef(null);
  const cursorTextContainerRef = useRef(null);
  const cursorTextRef = useRef(null);

  useSpinningTextCursor(
    ".cursor-hover-item",
    // cursorWrapperRef,
    cursorTextContainerRef,
    cursorTextRef
  );

  return (
    <>
      <div
        className={`ring ${cursorType}`}
        style={{ left: `${ringX}px`, top: `${ringY}px` }}
      ></div>
      <div
        className={`dot ${cursorType}`}
        style={{ left: `${dotX}px`, top: `${dotY}px` }}
      ></div>
      <div className="cursor" ref={cursorWrapperRef}>
        <div className="cursor--text" ref={cursorTextContainerRef}>
          <div className="text" ref={cursorTextRef}>
            GO HERE! GO HERE! GO HERE! GO HERE!
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Cursor);
