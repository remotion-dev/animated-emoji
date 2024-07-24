// "bun render.ts"

import { bundle } from "@remotion/bundler";
import { selectComposition } from "@remotion/renderer";
import { data } from "./src/data";
import { iconIdentifier } from "./src/get-icon-identifier";
import { renderHevc } from "./rendering/render-hevc";
import { renderWebm } from "./rendering/render-webm";

const serveUrl = await bundle({
  entryPoint: "./src/index.ts",
  onProgress: (progress) => {
    console.log(`Bundling: ${progress.toFixed(2)}%`);
  },
});

for (const icon of data.icons) {
  const composition = await selectComposition({
    serveUrl,
    id: iconIdentifier(icon),
    logLevel: "verbose",
    port: 4000,
  });

  await renderHevc({
    serveUrl,
    composition,
    icon,
    scale: 1,
  });
  await renderWebm({
    serveUrl,
    composition,
    scale: 1,
    icon,
  });

  await renderHevc({
    serveUrl,
    composition,
    icon,
    scale: 0.5,
  });
  await renderWebm({
    serveUrl,
    composition,
    scale: 0.5,
    icon,
  });

  await renderHevc({
    serveUrl,
    composition,
    icon,
    scale: 2,
  });
  await renderWebm({
    serveUrl,
    composition,
    scale: 2,
    icon,
  });
}
