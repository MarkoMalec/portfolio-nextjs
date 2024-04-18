import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CSSPlugin } from "gsap/CSSPlugin";
import CircleType from "circletype/dist/circletype.min.js";

gsap.registerPlugin(CSSPlugin);

const useSpinningTextCursor = (
  hoverQuerySelector,
  cursorTextContainer,
  cursorTextEl
) => {
  useGSAP(() => {
    const hoverItems = document.querySelectorAll(hoverQuerySelector);
    if (!hoverItems || hoverItems.length === 0) return;

    const hoverEffectDuration = 0.1;
    let isHovered = false;
    let initialCursorHeight;
    const cursorRotationDuration = 7;

    let circleType = new CircleType(cursorTextEl.current);
    circleType.radius(1);

    setTimeout(() => {
      initialCursorHeight =
        circleType.container.style.getPropertyValue("width");
    }, 1);

    hoverItems.forEach((item) => {
      item.addEventListener("pointerenter", handlePointerEnter);
      item.addEventListener("pointerleave", handlePointerLeave);
    });

    let mouse = {
      x: -100,
      y: -100,
    };

    document.body.addEventListener("pointermove", updateCursorPosition);

    function updateCursorPosition(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    let animationFrameId;

    function updateCursor() {
      if (cursorTextContainer.current) {
        gsap.set(cursorTextContainer.current, {
          x: mouse.x,
          y: mouse.y,
        });
      }

      if (!isHovered && cursorTextContainer.current) {
        gsap.to(cursorTextContainer.current, {
          duration: hoverEffectDuration * 0.5,
          opacity: 0,
        });
        gsap.set(cursorTextContainer.current, {
          rotate: 0,
        });
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    }

    updateCursor();

    function handlePointerEnter(e) {
      isHovered = true;
      const target = e.currentTarget;
      updateCursorText(target);

      if (cursorTextContainer.current && cursorTextEl.current) {
        gsap.set([cursorTextContainer.current, cursorTextEl.current], {
          height: initialCursorHeight,
          width: initialCursorHeight,
        });

        gsap.fromTo(
          cursorTextContainer.current,
          { rotate: 0 },
          {
            duration: cursorRotationDuration,
            rotate: 360,
            transformOrigin: "center",
            ease: "none",
            repeat: -1,
          }
        );

        gsap.fromTo(
          cursorTextContainer.current,
          {
            duration: hoverEffectDuration,
            scale: 1.2,
            opacity: 0,
          },
          {
            delay: hoverEffectDuration * 0.75,
            scale: 1.2,
            opacity: 1,
          }
        );
      }
    }

    function handlePointerLeave() {
      isHovered = false;
    }

    function updateCursorText(textEl) {
      const cursorTextRepeatTimes = textEl.getAttribute(
        "data-cursor-text-repeat"
      );
      const cursorText = returnMultipleString(
        textEl.getAttribute("data-cursor-text"),
        cursorTextRepeatTimes
      );

      circleType.destroy();

      cursorTextEl.current.innerHTML = cursorText;
      circleType = new CircleType(cursorTextEl.current);

      console.log(cursorTextEl.current);
    }

    function returnMultipleString(string, count) {
      let s = "";
      for (let i = 0; i < count; i++) {
        s += ` ${string} `;
      }
      return s;
    }
  });
};

export default useSpinningTextCursor;
