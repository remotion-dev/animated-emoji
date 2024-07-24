import { Lottie, LottieAnimationData } from "@remotion/lottie";
import React from "react";

export const MyComposition: React.FC<{
  animationData: LottieAnimationData | null;
}> = ({ animationData }) => {
  if (!animationData) {
    throw new Error("No animation data");
  }

  return (
    <Lottie
      animationData={animationData}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
