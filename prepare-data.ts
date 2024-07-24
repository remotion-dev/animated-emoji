import { writeFileSync } from "fs";
import { data } from "./src/data";
import { iconIdentifier } from "./src/get-icon-identifier";
import { LottieAnimationData } from "@remotion/lottie";

type Emoji = {
  name: string;
  categories: string[];
  tags: string[];
  durationInSeconds: number;
};

const emojis: Emoji[] = [];

for (const emoji of data.icons) {
  const data = await fetch(
    `https://fonts.gstatic.com/s/e/notoemoji/latest/${emoji.codepoint}/lottie.json`
  );
  const json = (await data.json()) as LottieAnimationData;

  const d: Emoji = {
    name: iconIdentifier(emoji),
    categories: emoji.categories,
    tags: emoji.tags,
    durationInSeconds: json.op / json.fr,
  };
  console.log(d);
  emojis.push(d);
}

writeFileSync("emojis.json", JSON.stringify(emojis, null, 2));
