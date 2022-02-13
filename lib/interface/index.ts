export type Result = "FAIL" | "AA" | "AAA";

export type ColorType = "hex" | "rgb" | "hsl" | "cmyk";

export type Color = "bgColor" | "textColor";

export type RgbColor = {
  r: number;
  g: number;
  b: number;
};

export type ColorPalette = Array<{
  colors: Array<{ rgb: string; hex: string; hsl: string; cmyk: string }>;
  mode: string;
  paletteName: string;
}>;
