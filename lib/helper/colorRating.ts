import { Result, RgbColor } from "../interface";
import { convertColorToRgbObject } from "./colorConverter";

export const getLuminance = ({ r, g, b }: RgbColor): number => {
  let a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const contrast = (textColor: string, bgColor: string): number => {
  const lum1 = getLuminance(convertColorToRgbObject(textColor));
  const lum2 = getLuminance(convertColorToRgbObject(bgColor));

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;
};

export const getTextRating = (textColor: string, bgColor: string): Result => {
  const contrastRatio = contrast(textColor, bgColor);
  if (contrastRatio >= 7) return "AAA";
  if (contrastRatio >= 4.5) return "AA";
  return "FAIL";
};

export const getHeadingRating = (
  textColor: string,
  bgColor: string
): Result => {
  const contrastRatio = contrast(textColor, bgColor);
  if (contrastRatio >= 4.5) return "AAA";
  if (contrastRatio >= 3) return "AA";
  return "FAIL";
};
