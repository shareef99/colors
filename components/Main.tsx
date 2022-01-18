import { ChangeEvent, useEffect, useState } from "react";
import { RgbColor, RgbStringColorPicker, HslColor } from "react-colorful";
import { MdFlipCameraAndroid } from "react-icons/md";
import { rgbToHsl, rgbToHex, rgbToCmyk } from "../helper/colorConverter";

type Result = "FAIL" | "AA" | "AAA";
type ColorType = "hex" | "rgb" | "hsl" | "cmyk";

interface Props {}

const Main = (props: Props) => {
  // Constants
  const colorTypes: Array<ColorType> = ["rgb", "hsl", "hex", "cmyk"];

  // States
  const [currentColor, setCurrentColor] = useState<"bgColor" | "textColor">(
    "bgColor"
  );
  const [bgColor, setBgColor] = useState<string>("rgb(98, 135, 193)");
  const [textColor, setTextColor] = useState<string>("rgb(44, 45, 45)");
  const [colorContrast, setColorContrast] = useState<number>(3.79);
  const [textResult, setTextResult] = useState<Result>("FAIL");
  const [headingResult, setHeadingResult] = useState<Result>("FAIL");
  const [whichTypeOfColorsToDisplay, setWhichTypeOfColorToDisplay] = useState<
    Array<ColorType>
  >(["rgb"]);

  const convertColorToRgbObject = (color: string): RgbColor => {
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

  const convertColorToHslObject = (color: string): HslColor => {
    let [h, s, l] = color.split(",");

    h = h.slice(4);
    s = s.trim().replace("%", "");
    l = l.trim().replace("%", "").slice(0, -1);

    return {
      h: +h,
      s: +s,
      l: +l,
    };
  };

  const getLuminance = ({ r, g, b }: RgbColor): number => {
    let a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const contrast = (textColor: string, bgColor: string): number => {
    const lum1 = getLuminance(convertColorToRgbObject(textColor));
    const lum2 = getLuminance(convertColorToRgbObject(bgColor));

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;
  };

  const getTextRating = (): Result => {
    const contrastRatio = contrast(textColor, bgColor);
    if (contrastRatio >= 7) return "AAA";
    if (contrastRatio >= 4.5) return "AA";
    return "FAIL";
  };

  const getHeadingRating = (): Result => {
    const contrastRatio = contrast(textColor, bgColor);
    if (contrastRatio >= 4.5) return "AAA";
    if (contrastRatio >= 3) return "AA";
    return "FAIL";
  };

  const colorConverter = (color: string, colorType: ColorType): string => {
    if (colorType === "hsl") {
      const rgbColor: RgbColor = convertColorToRgbObject(color);
      const hslColor = rgbToHsl(rgbColor);
      console.log(hslColor);
      return hslColor;
    }
    if (colorType === "hex") {
      const rgbColor: RgbColor = convertColorToRgbObject(color);
      const hexColor = rgbToHex(rgbColor);
      console.log(hexColor);
      return hexColor;
    }
    if (colorType === "cmyk") {
      const rgbColor: RgbColor = convertColorToRgbObject(color);
      const cmykColor = rgbToCmyk(rgbColor);
      console.log(cmykColor);
      return cmykColor;
    }
    return color;
  };

  const handleColorTypeChange = (colorType: ColorType) => {
    if (whichTypeOfColorsToDisplay.includes(colorType))
      return setWhichTypeOfColorToDisplay(
        whichTypeOfColorsToDisplay.filter((type) => type !== colorType)
      );
    setWhichTypeOfColorToDisplay((prev) => [...prev, colorType]);

    if (colorType === "hsl") {
      console.log(
        convertColorToHslObject(colorConverter(textColor, colorType))
      );
    }
  };

  const handleRgbColorChange = (
    e: ChangeEvent<HTMLInputElement>,
    x: string
  ) => {
    e.preventDefault();
    if (isNaN(Number(e.target.value))) return;
    if (Number(e.target.value) < 0 || Number(e.target.value) > 255) return;
    let r: number, g: number, b: number;
    if (x === "r") {
      r = Number(e.target.value);
      g = convertColorToRgbObject(textColor).g;
      b = convertColorToRgbObject(textColor).b;
    } else if (x === "g") {
      r = convertColorToRgbObject(textColor).r;
      g = Number(e.target.value);
      b = convertColorToRgbObject(textColor).b;
    } else if (x === "b") {
      r = convertColorToRgbObject(textColor).r;
      g = convertColorToRgbObject(textColor).g;
      b = Number(e.target.value);
    }
    return setTextColor(`rgb(${r}, ${g}, ${b})`);
  };

  useEffect(() => {
    if (bgColor && textColor) {
      const contrastValue = contrast(textColor, bgColor);
      setColorContrast(contrastValue);
      setTextResult(getTextRating());
      setHeadingResult(getHeadingRating());
    }
  }, [bgColor, textColor]);

  return (
    <main className="container md:w-[80%] md:mx-auto">
      <div className="mt-6">
        <p
          id="logo"
          className="font-bold text-3xl first-letter:text-blue first-letter:text-5xl"
        >
          <span>G𝚘𝚘d</span>
          <span className="inline-block first-letter:text-blue first-letter:text-4xl">
            C𝚘ʅ𝚘rs
          </span>
        </p>
      </div>
      <section className="flex justify-between">
        {/* color picker */}
        <div className="flex-grow mr-3">
          <div className="flex justify-between font-medium text-gray-600">
            <p>
              <span>Color contrast:</span>
              <span className="text-2xl pl-2">{colorContrast}</span>
            </p>
            <div className="space-x-8 self-end ">
              <span>
                Text{" "}
                <span
                  className="font-medium text-xl ml-1"
                  style={{
                    color: textResult === "FAIL" ? "rgb(220 38 38)" : "green",
                  }}
                >
                  {textResult}
                </span>
              </span>
              <span>
                Heading{" "}
                <span
                  className="font-medium text-xl ml-1"
                  style={{
                    color:
                      headingResult === "FAIL" ? "rgb(220 38 38)" : "green",
                  }}
                >
                  {headingResult}
                </span>
              </span>
            </div>
          </div>
          <div className="color-picker mt-2">
            <RgbStringColorPicker
              color={currentColor === "bgColor" ? bgColor : textColor}
              onChange={currentColor === "bgColor" ? setBgColor : setTextColor}
            />
          </div>
        </div>

        {/* Color display */}
        <div className="self-center">
          <div
            id="flip and color types"
            className="flex justify-between mb-2 font-medium"
          >
            <button
              onClick={() => {
                setBgColor(textColor);
                setTextColor(bgColor);
              }}
              className="flex"
            >
              Flip <MdFlipCameraAndroid className="self-center ml-1" />
            </button>
            <div className="space-x-2">
              {colorTypes.map((colorType) => (
                <span
                  onClick={() => handleColorTypeChange(colorType)}
                  className={`cursor-pointer ${
                    whichTypeOfColorsToDisplay.includes(colorType)
                      ? "text-blue"
                      : "text-gray-500"
                  }`}
                  key={colorType}
                >
                  {colorType}
                </span>
              ))}
            </div>
          </div>
          <div id="textColor" className="mb-4">
            <div
              className={`w-56 rounded shadow-md flex justify-center items-center ${
                whichTypeOfColorsToDisplay.length === 0
                  ? "h-[216px]"
                  : whichTypeOfColorsToDisplay.length === 1
                  ? "h-48"
                  : whichTypeOfColorsToDisplay.length === 2
                  ? "h-[168px]"
                  : whichTypeOfColorsToDisplay.length === 3
                  ? "h-36"
                  : "h-[120px]"
              }`}
              style={{ backgroundColor: textColor, color: bgColor }}
              onClick={() => setCurrentColor("textColor")}
            >
              <span className="inline-block">Text Color</span>
            </div>
            <div className="flex flex-col ml-2 mt-2">
              {whichTypeOfColorsToDisplay.map((colorType) => (
                <div key={colorType}>
                  {colorType === "rgb" ? (
                    <div className="flex text-center">
                      <div>
                        <span>r:</span>
                        <input
                          type="text"
                          className="w-8 text-center p-0 m-0 border-0 bg-transparent"
                          value={convertColorToRgbObject(textColor).r}
                          onChange={(e) => handleRgbColorChange(e, "r")}
                        />
                      </div>
                      <div>
                        <span>g:</span>
                        <input
                          type="text"
                          value={convertColorToRgbObject(textColor).g}
                          className="w-8 text-center p-0 m-0 border-0 bg-transparent"
                          onChange={(e) => handleRgbColorChange(e, "g")}
                        />
                      </div>
                      <div>
                        <span>b:</span>
                        <input
                          type="text"
                          value={convertColorToRgbObject(textColor).b}
                          className="w-8 text-center p-0 m-0 border-0 bg-transparent"
                          onChange={(e) => handleRgbColorChange(e, "b")}
                        />
                      </div>
                    </div>
                  ) : colorType === "hsl" ? (
                    colorConverter(textColor, "hsl")
                  ) : colorType === "hex" ? (
                    colorConverter(textColor, "hex")
                  ) : (
                    colorConverter(textColor, "cmyk")
                  )}
                </div>
              ))}
            </div>
          </div>
          <div id="bgColor">
            <div
              className={`w-56 rounded shadow-md flex justify-center items-center ${
                whichTypeOfColorsToDisplay.length === 0
                  ? "h-[216px]"
                  : whichTypeOfColorsToDisplay.length === 1
                  ? "h-48"
                  : whichTypeOfColorsToDisplay.length === 2
                  ? "h-[168px]"
                  : whichTypeOfColorsToDisplay.length === 3
                  ? "h-36"
                  : "h-[120px]"
              }`}
              style={{ backgroundColor: bgColor, color: textColor }}
              onClick={() => setCurrentColor("bgColor")}
            >
              <span>Background Color</span>
            </div>
            <div className="flex flex-col ml-2 mt-2">
              {whichTypeOfColorsToDisplay.map((colorType) => (
                <span key={colorType}>
                  {colorType === "rgb" ? (
                    <div className="flex text-center">
                      <div>
                        <span>r:</span>
                        <input
                          type="text"
                          className="w-8 text-center p-0 m-0 border-0 bg-transparent"
                          value={convertColorToRgbObject(bgColor).r}
                          onChange={(e) => handleRgbColorChange(e, "r")}
                        />
                      </div>
                      <div>
                        <span>g:</span>
                        <input
                          type="text"
                          value={convertColorToRgbObject(bgColor).g}
                          className="w-8 text-center p-0 m-0 border-0 bg-transparent"
                          onChange={(e) => handleRgbColorChange(e, "g")}
                        />
                      </div>
                      <div>
                        <span>b:</span>
                        <input
                          type="text"
                          value={convertColorToRgbObject(bgColor).b}
                          className="w-8 text-center p-0 m-0 border-0 bg-transparent"
                          onChange={(e) => handleRgbColorChange(e, "b")}
                        />
                      </div>
                    </div>
                  ) : colorType === "hsl" ? (
                    colorConverter(bgColor, "hsl")
                  ) : colorType === "hex" ? (
                    colorConverter(bgColor, "hex")
                  ) : (
                    colorConverter(bgColor, "cmyk")
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
