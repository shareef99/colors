import { ChangeEvent, Fragment, useEffect, useState } from "react";
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
  const [bgColor, setBgColor] = useState<string>("rgb(165, 189, 228)");
  const [textColor, setTextColor] = useState<string>("rgb(25, 45, 45)");
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
    <main>
      <div className="mt-6 container">
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
      <section className="flex justify-between container">
        {/* color picker */}
        <div className="flex-grow mr-3">
          <div className="flex justify-between font-medium text-gray-600 px-5">
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
        <div className="self-center ">
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
              key={color}
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

      <div className="rotate-180 h-14 relative -z-50 -mt-28">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 293 94"
          xmlSpace="preserve"
          preserveAspectRatio="none"
          fill={bgColor}
          className="w-full h-full"
        >
          <polygon points="0,0 0,94 293,0 "></polygon>
        </svg>
      </div>

      <section
        className="py-28 px-[10%] space-y-[40px]"
        style={{
          background: bgColor,
          color: textColor,
        }}
      >
        <div className="">
          <h1 className="font-black text-5xl">
            Why choosing Good Colors is important.
          </h1>
          <p className="py-5 font-medium strong italic text-lg">
            Choosing the right color combinations is crucial to creating a
            successful website.
          </p>
          <p>
            Choosing colors for a website is not about just choosing colors that
            you like, the colors should strengthen the website and branding of
            the business. Colors that work well individually may not be as
            pleasing together as they are individually. By considering color
            combination as both a science, seeing how colors work together
            literally, and as an art, by seeing what colors symbolize and how
            they are evaluated internally and emotionally, the correct color
            combination for your website design can be achieved.
          </p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl">Colour contrast</h2>
          <p className="pt-5">
            For digital accessibility, the concept of color contrast is as
            critical as it is simple. Color contrast refers to the difference in
            light between foreground and its background. By using
            sufficiently-contrasting colors you are making sure that the great
            content you've developed for your website can be read by everyone.
          </p>
        </div>
        <div className="">
          <blockquote
            className="border-l-4 rounded-tl-sm rounded-bl-sm pl-10"
            style={{ borderColor: textColor }}
          >
            how we are{" "}
            <a
              href="https://www.google.com"
              target="_blank"
              className="font-medium hover:opacity-90 hover:duration-500 hover:ease-in"
            >
              calculating Color Contrast
            </a>
          </blockquote>
        </div>
      </section>
    </main>
  );
};

export default Main;
