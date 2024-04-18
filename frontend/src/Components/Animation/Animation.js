import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Animation = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    // Animating the title element using GSAP
    gsap.from(titleRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
    });
  }, []);

  return (
    <div>
      <h1 ref={titleRef}>Welcome to Your Personal Money Manager!</h1>
    </div>
  );
};

export default Animation;
