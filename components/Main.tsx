import { ChangeEvent, useEffect, useState } from "react";
import { RgbStringColorPicker } from "react-colorful";
import { MdFlipCameraAndroid } from "react-icons/md";
import {
  convertColorToRgbObject,
  getRandomColor,
} from "../lib/helper/colorConverter";
import {
  contrast,
  getTextRating,
  getHeadingRating,
} from "../lib/helper/colorRating";
import {
  ColorType,
  Result,
  Color,
  ColorPalette,
  RgbColor,
} from "../lib/interface";
import ColorPreview from "./HomePage/ColorPreview";
import SlightSlope from "./HomePage/SlightSlope";

interface Props {}

const Main = (props: Props) => {
  // Constants
  const colorTypes: Array<ColorType> = ["hex", "rgb", "hsl", "cmyk"];
  const colors: Array<Color> = ["textColor", "bgColor"];
  const modes: Array<{ mode: string; name: string; count: number }> = [
    { mode: "complement", name: "Complementary", count: 2 },
    { mode: "monochrome", name: "Monochromatic", count: 3 },
    { mode: "analogic", name: "Analogous", count: 3 },
    { mode: "triad", name: "Triadic", count: 3 },
    { mode: "quad", name: "Tetradic", count: 4 },
  ];

  // States
  const [currentColor, setCurrentColor] = useState<"bgColor" | "textColor">(
    "bgColor"
  );
  const [bgColor, setBgColor] = useState<string>("rgb(165, 189, 228)");
  const [textColor, setTextColor] = useState<string>("rgb(25, 45, 45)");
  const [colorContrast, setColorContrast] = useState<number>(7.56);
  const [textResult, setTextResult] = useState<Result>("AAA");
  const [headingResult, setHeadingResult] = useState<Result>("AAA");
  const [typesOfColor, setTypesOfColor] = useState<Array<ColorType>>(["rgb"]);
  const [textColorPalettes, setTextColorPalettes] = useState<ColorPalette>([]);
  const [bgColorPalettes, setBgColorPalettes] = useState<ColorPalette>([]);
  const [shouldGeneratePalette, setShouldGeneratePalette] =
    useState<any>(false);

  // Handlers
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

  const generateColors = (color: string) => {
    const RgbColor: RgbColor = convertColorToRgbObject(color);
    const pallettes = modes.map(async ({ mode, count, name }) => {
      const res = await fetch(
        `https://www.thecolorapi.com/scheme?rgb=${RgbColor.r},${RgbColor.g},${RgbColor.b}&format=json&mode=${mode}&count=${count}`
      );
      const data = await res.json();
      return {
        colors: data.colors.map((color) => ({
          rgb: color.rgb.value,
          hex: color.hex.value,
          hsl: color.hsl.value,
          cmyk: color.cmyk.value,
        })),
        mode,
        paletteName: name,
      };
    });
    return pallettes;
  };

  const handleScroll = () => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= 800) {
        setShouldGeneratePalette(true);
      }
      if (window.pageYOffset < 800) {
        setShouldGeneratePalette(false);
      }
    });
  };

  // Effects
  useEffect(() => {
    if (bgColor && textColor) {
      const contrastValue = contrast(textColor, bgColor);
      setColorContrast(contrastValue);
      setTextResult(getTextRating(textColor, bgColor));
      setHeadingResult(getHeadingRating(textColor, bgColor));
    }
  }, [bgColor, textColor]);

  useEffect(() => {
    handleScroll();
    return () => {
      setShouldGeneratePalette({});
    };
  }, []);

  useEffect(() => {
    if (shouldGeneratePalette === true) {
      console.log("generating");
      setBgColorPalettes([]);
      setTextColorPalettes([]);
      generateColors(bgColor).forEach(async (x) => {
        const palette = await x;
        setBgColorPalettes((prev) =>
          [...prev, palette].sort((a, b) =>
            a.paletteName.localeCompare(b.paletteName)
          )
        );
      });
      generateColors(textColor).forEach(async (x) => {
        const palette = await x;
        setTextColorPalettes((prev) =>
          [...prev, palette].sort((a, b) =>
            a.paletteName.localeCompare(b.paletteName)
          )
        );
      });
    }
  }, [shouldGeneratePalette]);

  return (
    <main>
      <div className="mt-6 mb-2 container">
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
      <section className="flex flex-col md:flex-row justify-between container">
        {/* color picker */}
        <div className="flex-grow mr-3">
          <div
            className="flex flex-col xs:flex-row xs:justify-between xs:items-center font-medium 
              text-gray-600 pl-5 xs:pl-0 sm:px-5"
          >
            <p>
              <span>Color contrast:</span>
              <span className="text-2xl pl-2">{colorContrast}</span>
            </p>
            <div className="space-x-8">
              <span>
                Text{" "}
                <span
                  className="font-medium text-xl ml-1"
                  style={{
                    color:
                      textResult === "FAIL" ? "var(--error)" : "var(--success)",
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
                      headingResult === "FAIL"
                        ? "var(--error)"
                        : "var(--success)",
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
          <div className="flex flex-col xs:flex-row xs:space-x-4 md:flex-col md:space-x-0">
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
        </div>
      </section>

      <SlightSlope bgColor={bgColor} position="top" />

      <section
        className="py-28 px-4 xs:px-[10%]"
        style={{
          background: bgColor,
          color: textColor,
        }}
      >
        <div className="flex">
          <div className="flex flex-col font-semibold text-center pr-4">
            <span
              className={`${headingResult === "FAIL" ? "line-through" : ""}`}
            >
              AA
            </span>
            <span
              className={`${headingResult === "AAA" ? "" : "line-through"}`}
            >
              AAA
            </span>
          </div>
          <h1 className="font-black text-4xl xs:text-5xl">
            Why choosing Good Colors is important.
          </h1>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col font-semibold text-center pr-4">
            <span className={`${textResult === "FAIL" ? "line-through" : ""}`}>
              AA
            </span>
            <span className={`${textResult === "AAA" ? "" : "line-through"}`}>
              AAA
            </span>
          </div>
          <div>
            <p className="py-5 font-medium strong italic text-lg">
              Choosing the right color combinations is crucial to creating a
              successful website.
            </p>
            <p>
              Choosing colors for a website is not about just choosing colors
              that you like, the colors should strengthen the website and
              branding of the business. Colors that work well individually may
              not be as pleasing together as they are individually. By
              considering color combination as both a science, seeing how colors
              work together literally, and as an art, by seeing what colors
              symbolize and how they are evaluated internally and emotionally,
              the correct color combination for your website design can be
              achieved.
            </p>
          </div>
        </div>

        <div className="py-10">
          <h2 className="font-bold text-3xl">Colour contrast</h2>
          <p className="pt-5">
            For digital accessibility, the concept of color contrast is as
            critical as it is simple. Color contrast refers to the difference in
            light between foreground and its background. By using
            sufficiently-contrasting colors you are making sure that the great
            content you've developed for your website can be read by everyone.
          </p>
        </div>

        <div className="text-xl">
          <blockquote
            className="border-l-4 rounded-tl-sm rounded-bl-sm pl-4 xs:pl-8 sm:pl-10"
            style={{ borderColor: textColor }}
          >
            how to{" "}
            <a
              href="https://www.google.com"
              target="_blank"
              className="font-medium hover:opacity-90 hover:duration-500 hover:ease-in"
            >
              calculate Color Contrast
            </a>
          </blockquote>
          <br />
          <blockquote
            className="border-l-4 rounded-tl-sm rounded-bl-sm pl-4 xs:pl-8 sm:pl-10 flex flex-col"
            style={{ borderColor: textColor }}
          >
            <span>
              For <b>AA</b> the required contrast for <b>text</b> is <b>4.5</b>.
              <b>Headlines and large text</b> needs at least <b>3</b>.
            </span>
            <span>
              <b>AAA</b> requires <b>7</b> for <b>text</b>. For{" "}
              <b>headlines and large text</b> the minimum is
              <b>4.5</b>.
            </span>
          </blockquote>
        </div>

        <div className="pt-10 font-medium flex flex-col">
          <span className="pb-3">Random Colors</span>
          <div>
            <button
              className="border-2 rounded-md px-3 py-1 mx-0"
              style={{
                borderColor: textColor,
                color: bgColor,
                backgroundColor: textColor,
              }}
              onClick={() => setBgColor(getRandomColor())}
            >
              Background
            </button>
            <button
              className="border-2 rounded-md px-4 py-1 mx-4"
              style={{ borderColor: textColor }}
              onClick={() => setTextColor(getRandomColor())}
            >
              Text
            </button>
          </div>
        </div>
      </section>

      <SlightSlope bgColor={bgColor} position="bottom" />

      <section className="py-10 bg-lightBg container -mt-28 rounded-t-lg">
        <div className="text-center">
          <h2 className="text-4xl xs:text-5xl text-center font-semibold text-blue">
            More Fun With Colors
          </h2>
        </div>
        <div className="px-4 xs:px-[10%]">
          <div className="my-5">
            <div>
              <h3 className="font-semibold text-xl xs:text-2xl">
                Background Color Palettes
              </h3>
              <div className="space-x-2 font-medium">
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
            <div className="my-5 space-y-[16px]">
              {bgColorPalettes &&
                bgColorPalettes.map((colorPalettes) => (
                  <div key={Math.random()}>
                    <h3 className="font-medium pb-2">
                      {colorPalettes.paletteName}
                    </h3>
                    <div className="flex">
                      {colorPalettes.colors.map((color) => (
                        <div key={Math.random()}>
                          <div
                            style={{ backgroundColor: color.rgb }}
                            className="h-28 w-28"
                          ></div>
                          <p className="flex flex-col w-36">
                            {typesOfColor.map((value) =>
                              value === "rgb" ? (
                                <span>{color.rgb}</span>
                              ) : value === "hex" ? (
                                <span>{color.hex}</span>
                              ) : value === "hsl" ? (
                                <span>{color.hsl}</span>
                              ) : (
                                <span>{color.cmyk.replaceAll("NaN", "0")}</span>
                              )
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-semibold text-xl xs:text-2xl">
              Text Color Palettes
            </h3>
            <div className="my-5 space-y-[16px]">
              {textColorPalettes &&
                textColorPalettes.map((colorPalettes) => (
                  <div key={Math.random()}>
                    <h3 className="font-medium pb-2">
                      {colorPalettes.paletteName}
                    </h3>
                    <div className="flex">
                      {colorPalettes.colors.map((color) => (
                        <div key={Math.random()}>
                          <div
                            style={{ backgroundColor: color.rgb }}
                            className="h-28 w-28"
                          ></div>
                          <p className="flex flex-col w-36">
                            {typesOfColor.map((value) =>
                              value === "rgb" ? (
                                <span>{color.rgb}</span>
                              ) : value === "hex" ? (
                                <span>{color.hex}</span>
                              ) : value === "hsl" ? (
                                <span>{color.hsl}</span>
                              ) : (
                                <span>{color.cmyk.replaceAll("NaN", "0")}</span>
                              )
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
