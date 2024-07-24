import { data, Icon } from "./data";

const codePointName = (point: string) => {
  if (point === "1f3fb") {
    return "skin-tone-1";
  }
  if (point === "1f3fc") {
    return "skin-tone-2";
  }
  if (point === "1f3fd") {
    return "skin-tone-3";
  }
  if (point === "1f3fe") {
    return "skin-tone-4";
  }
  if (point === "1f3ff") {
    return "skin-tone-5";
  }
  return "";
};

export const iconIdentifier = (icon: Icon) => {
  const firstTag = icon.tags[0];
  const codePoint = icon.codepoint.replace(/_/g, "-");
  const isAmbiguous =
    data.icons.filter((icon) => icon.tags.includes(firstTag)).length > 1;
  const splittedCodePoint = codePoint.split("-");
  const lastCodePoint = splittedCodePoint[splittedCodePoint.length - 1];
  const name = codePointName(lastCodePoint);

  const id = [
    firstTag
      .replace(/:/g, "")
      .trim()
      .replace(/\s/g, "-")
      .replace(/ñ/g, "n")
      .replace(/!/, ""),
    isAmbiguous ? name : null,
  ]
    .filter(Boolean)
    .join("-")
    .toLowerCase();

  return id;
};
