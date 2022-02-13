import { ChangeEvent, useEffect, useState } from "react";
import { RgbStringColorPicker } from "react-colorful";
import { MdFlipCameraAndroid } from "react-icons/md";
import { convertColorToRgbObject } from "../lib/helper/colorConverter";
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
import ColorPalettes from "./HomePage/ColorPalettes";
import ColorPreview from "./HomePage/ColorPreview";
import Content from "./HomePage/Content";
import TypesOfColor from "./HomePage/TypesOfColor";

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
      setBgColorPalettes([]);
      setTextColorPalettes([]);
      generateColors(bgColor).forEach(async (x) => {
        const palette = await x;
        setBgColorPalettes((prev) =>
          [...prev, palette].sort((a, b) =>
            a.colors.length === b.colors.length
              ? 0
              : a.colors.length < b.colors.length
              ? -1
              : 1
          )
        );
      });
      generateColors(textColor).forEach(async (x) => {
        const palette = await x;
        setTextColorPalettes((prev) =>
          [...prev, palette].sort((a, b) =>
            a.colors.length === b.colors.length
              ? 0
              : a.colors.length < b.colors.length
              ? -1
              : 1
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
            <TypesOfColor
              colorTypes={colorTypes}
              onHandleColorTypeChange={handleColorTypeChange}
              typesOfColor={typesOfColor}
            />
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
      <Content
        bgColor={bgColor}
        textColor={textColor}
        headingResult={headingResult}
        textResult={textResult}
        onBgColorChange={(color: string) => setBgColor(color)}
        onTextColorChange={(color: string) => setTextColor(color)}
      />
      <section className="py-10 bg-lightBg container -mt-28 rounded-t-lg">
        <div className="text-center">
          <h2 className="text-4xl xs:text-5xl text-center font-semibold text-blue">
            More Fun With Colors
          </h2>
        </div>
        <div className="px-4 xs:px-[10%]">
          <div className="my-5">
            <h3 className="font-semibold text-xl xs:text-2xl">
              Background Color Palettes
            </h3>
            <TypesOfColor
              colorTypes={colorTypes}
              onHandleColorTypeChange={handleColorTypeChange}
              typesOfColor={typesOfColor}
              className="font-medium"
            />
            <ColorPalettes
              typesOfColor={typesOfColor}
              colorPalettes={bgColorPalettes}
            />
          </div>
          <div className="my-5">
            <h3 className="font-semibold text-xl xs:text-2xl">
              Text Color Palettes
            </h3>
            <ColorPalettes
              typesOfColor={typesOfColor}
              colorPalettes={textColorPalettes}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
