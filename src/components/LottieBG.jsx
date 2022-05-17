import React from 'react'
import { useLottie } from "lottie-react";

import groovyWalkAnimation from "../assets/animations/animation.json";

const LottieBG = ({children}) => {

  const options = {
    animationData: groovyWalkAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return View;
};

export default LottieBG;
