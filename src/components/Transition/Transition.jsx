import React from "react";
import { motion } from "framer-motion";

const TransitionVariants = {
  initial: {
    x: "100%",
    width: "100%",
  },
  animate: {
    x: "0%",
    width: "0%",
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
  },
};

const Transition = () => {
  return (
    <>
      <motion.div className="transition-div one" variants={TransitionVariants} initial="initial" animate="animate" exit="exit" transition={{ delay: 0.6, duration: 0.6, ease: 'easeInOut' }}></motion.div>
      <motion.div className="transition-div two" variants={TransitionVariants} initial="initial" animate="animate" exit="exit" transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}></motion.div>
      <motion.div className="transition-div three" variants={TransitionVariants} initial="initial" animate="animate" exit="exit" transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}></motion.div>
      {/* <motion.div className="transition-div four" variants={TransitionVariants} initial="initial" animate="animate" exit="exit" transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}></motion.div>
      <motion.div className="transition-div five" variants={TransitionVariants} initial="initial" animate="animate" exit="exit" transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}></motion.div> */}

    </>
  );
};

export default Transition;
