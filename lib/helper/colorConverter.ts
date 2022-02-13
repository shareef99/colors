import { RgbColor } from "react-colorful";
import { ColorType } from "../interface";

export const rgbToHsl = ({ r, g, b }: RgbColor): string => {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  const cMin = Math.min(r, g, b);
  const cMax = Math.max(r, g, b);
  const delta = cMax - cMin;
  let h = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cMax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cMax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  let l = (cMax + cMin) / 2;

  // Calculate saturation
  let s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const rgbToHex = ({ r, g, b }: RgbColor): string => {
  let rr = r.toString(16);
  let gg = g.toString(16);
  let bb = b.toString(16);

  if (rr.length == 1) rr = "0" + rr;
  if (gg.length == 1) gg = "0" + gg;
  if (bb.length == 1) bb = "0" + bb;

  return "#" + rr + gg + bb;
};

export const rgbToCmyk = ({ r, g, b }: RgbColor): string => {
  if (r === 0 && g === 0 && b === 0) return "cmyk(0%, 0%, 0%, 100%)";

  r /= 255;
  g /= 255;
  b /= 255;

  let k = 1 - Math.max(r, g, b);
  let c = (1 - r - k) / (1 - k);
  let m = (1 - g - k) / (1 - k);
  let y = (1 - b - k) / (1 - k);

  k = Math.round(k * 100);
  c = Math.round(c * 100);
  m = Math.round(m * 100);
  y = Math.round(y * 100);

  return `cmyk(${c}%, ${m}%, ${y}}%, ${k}%)`;
};

export const convertColorToRgbObject = (color: string): RgbColor => {
  const rgb = color.match(/\d+/g);
  if (
    rgb === undefined ||
    rgb === null ||
    rgb[0] === undefined ||
    rgb[1] === undefined ||
    rgb[2] === undefined
  )
    return { r: 0, g: 0, b: 0 };

  return {
    r: +rgb[0],
    g: +rgb[1],
    b: +rgb[2],
  };
};

export const colorConverter = (color: string, colorType: ColorType): string => {
  if (colorType === "hsl") {
    const rgbColor: RgbColor = convertColorToRgbObject(color);
    const hslColor = rgbToHsl(rgbColor);
    return hslColor;
  }
  if (colorType === "hex") {
    const rgbColor: RgbColor = convertColorToRgbObject(color);
    const hexColor = rgbToHex(rgbColor);
    return hexColor;
  }
  if (colorType === "cmyk") {
    const rgbColor: RgbColor = convertColorToRgbObject(color);
    const cmykColor = rgbToCmyk(rgbColor);
    return cmykColor;
  }
  return color;
};

export const getRandomColor = (): string => {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
};
