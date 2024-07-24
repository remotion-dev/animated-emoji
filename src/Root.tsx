import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { data } from "./data";
import { LottieAnimationData } from "@remotion/lottie";
import { iconIdentifier } from "./get-icon-identifier";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {data.icons.map((icon) => {
        const id = iconIdentifier(icon);

        return (
          <Composition
            key={id}
            id={id}
            component={MyComposition}
            durationInFrames={60}
            fps={30}
            width={1080}
            height={1080}
            defaultProps={{ animationData: null }}
            calculateMetadata={async () => {
              const data = await fetch(
                `https://fonts.gstatic.com/s/e/notoemoji/latest/${icon.codepoint}/lottie.json`
              );
              const json = (await data.json()) as LottieAnimationData;
              return {
                width: json.w,
                height: json.h,
                fps: json.fr,
                durationInFrames: json.op,
                props: {
                  animationData: json,
                },
              };
            }}
          />
        );
      })}
    </>
  );
};
