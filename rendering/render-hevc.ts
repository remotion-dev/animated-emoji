import { renderFrames } from "@remotion/renderer";
import { execSync } from "node:child_process";
import { join } from "node:path";
import { rmSync, existsSync } from "node:fs";
import { iconIdentifier } from "../src/get-icon-identifier";
import { VideoConfig } from "remotion";
import { Icon } from "../src/data";

export const renderHevc = async ({
  composition,
  serveUrl,
  icon,
  scale,
}: {
  serveUrl: string;
  composition: VideoConfig;
  icon: Icon;
  scale: number;
}) => {
  const output = join(
    process.cwd(),
    "public",
    `${iconIdentifier(icon)}-${scale}x.mp4`
  );

  if (existsSync(output)) {
    return;
  }

  await renderFrames({
    serveUrl,
    imageFormat: "png",
    composition,
    outputDir: `public/${iconIdentifier(icon)}`,
    port: 4000,
    inputProps: {},
    onFrameUpdate(framesRendered) {
      console.log(`${iconIdentifier(icon)}: ${framesRendered}`);
    },
    onStart() {
      console.log(`Rendering ${iconIdentifier(icon)}`);
    },
    scale,
  });
  execSync(
    `ffmpeg -i public/${iconIdentifier(icon)}/element-%0${String(composition.durationInFrames - 1).length}d.png -c:v hevc_videotoolbox -allow_sw 1 -alpha_quality 0.75 -vtag hvc1 ${output}`
  );
  rmSync(`public/${iconIdentifier(icon)}`, { recursive: true });
};
