import { ChangeEvent, useEffect, useState } from "react";
import { RgbStringColorPicker } from "react-colorful";
import { MdFlipCameraAndroid } from "react-icons/md";
import { convertColorToRgbObject } from "../lib/helper/colorConverter";
import {
  contrast,
  getTextRating,
  getHeadingRating,
} from "../lib/helper/colorRating";
import { ColorType, Result, Color } from "../lib/interface";
import ColorPreview from "./HomePage/ColorPreview";

interface Props {}

const Main = (props: Props) => {
  // Constants
  const colorTypes: Array<ColorType> = ["hex", "rgb", "hsl", "cmyk"];
  const colors: Array<Color> = ["textColor", "bgColor"];

  // States
  const [currentColor, setCurrentColor] = useState<"bgColor" | "textColor">(
    "bgColor"
  );
  const [bgColor, setBgColor] = useState<string>("rgb(98, 135, 193)");
  const [textColor, setTextColor] = useState<string>("rgb(44, 45, 45)");
  const [colorContrast, setColorContrast] = useState<number>(3.79);
  const [textResult, setTextResult] = useState<Result>("FAIL");
  const [headingResult, setHeadingResult] = useState<Result>("FAIL");
  const [typesOfColor, setTypesOfColor] = useState<Array<ColorType>>(["rgb"]);

  const handleColorTypeChange = (colorType: ColorType) => {
    if (typesOfColor.includes(colorType))
      return setTypesOfColor(typesOfColor.filter((type) => type !== colorType));
    setTypesOfColor((prev) => [...prev, colorType]);
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
      setTextResult(getTextRating(textColor, bgColor));
      setHeadingResult(getHeadingRating(textColor, bgColor));
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
                    typesOfColor.includes(colorType)
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
          {colors.map((color) => (
            <ColorPreview
              bgColor={bgColor}
              textColor={textColor}
              currentColor={color}
              onHandleRgbColorChange={handleRgbColorChange}
              typesOfColor={typesOfColor}
              onColorChange={() => setCurrentColor(color)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
