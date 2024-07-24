import { join } from "node:path";
import { existsSync } from "node:fs";
import { renderMedia } from "@remotion/renderer";
import { VideoConfig } from "remotion";
import { Icon } from "../src/data";
import { iconIdentifier } from "../src/get-icon-identifier";

export const renderWebm = async ({
  composition,
  serveUrl,
  scale,
  icon,
}: {
  serveUrl: string;
  composition: VideoConfig;
  scale: number;
  icon: Icon;
}) => {
  const output = join(
    process.cwd(),
    "public",
    `${iconIdentifier(icon)}-${scale}x.webm`
  );

  if (existsSync(output)) {
    return;
  }

  await renderMedia({
    serveUrl,
    codec: "vp8",
    imageFormat: "png",
    composition,
    outputLocation: output,
    onProgress: ({ progress }) => {
      console.log(`${composition.id}: ${(progress * 100).toFixed(2)}%`);
    },
    port: 4000,
    scale,
  });
};
