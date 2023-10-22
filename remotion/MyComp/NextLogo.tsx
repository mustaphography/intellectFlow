import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Define your animation variants
const imageVariants = {
  hidden: { opacity: 0, y: 50 }, // initial vertical position
  visible: {
    opacity: 1,
    y: 0, // end position for 'visible' state (moved upwards)
    transition: {
      duration: 1.5, // Duration for the 'visible' state transition
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: 50, // start moving back down before completely faded out
    transition: {
      opacity: {
        duration: 1.5, // control the duration of the opacity transition independently
        ease: "easeInOut",
      },
      y: {
        duration: 1, // shorter duration means it will start moving before fade out completes
        ease: "easeInOut",
      },
    },
  },
};

export const NextLogo: React.FC = () => {
  // Define your image URL.
  const imageUrl = "/logo.png"; // <-- Update this path

  // State variable to control the animation state
  const [animationState, setAnimationState] = useState("hidden");

  // Use an effect to change the animation state after a certain time has passed
  useEffect(() => {
    // Change to the 'visible' state shortly after mounting
    const visibleTimeout = setTimeout(() => {
      setAnimationState("visible");
    }, 500); // starts the 'visible' animation 500ms after mount

    // Change to the 'exit' state after some time
    const exitTimeout = setTimeout(() => {
      setAnimationState("exit");
    }, 4000); // starts the 'exit' animation 4 seconds after mount

    // Clean up the timeouts if the component is unmounted before they complete
    return () => {
      clearTimeout(visibleTimeout);
      clearTimeout(exitTimeout);
    };
  }, []); // The empty dependency array means this effect runs once when the component mounts

  return (
    <motion.img
      src={imageUrl}
      initial="hidden"
      animate={animationState} // This is now controlled by the state variable
      variants={imageVariants}
      alt="Your Logo"
      style={{
        width: "500px",
        height: "500px",
        position: "absolute", // Consider positioning if it's not laid out as expected
      }}
    />
  );
};
