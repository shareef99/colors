import { useEffect, useState } from "react";
import { RgbColor, RgbStringColorPicker, HexColorInput } from "react-colorful";

type Result = "FAIL" | "AA" | "AAA";

interface Props {}

const Main = (props: Props) => {
  const [currentColor, setCurrentColor] = useState<"bgColor" | "textColor">(
    "bgColor"
  );
  const [bgColor, setBgColor] = useState<string>("rgb(98, 135, 193)");
  const [textColor, setTextColor] = useState<string>("rgb(44, 45, 45)");
  const [colorContrast, setColorContrast] = useState<number>(3.79);
  const [textResult, setTextResult] = useState<Result>("FAIL");
  const [headingResult, setHeadingResult] = useState<Result>("FAIL");

  const changeColor = () => {
    if (currentColor === "bgColor") return setCurrentColor("textColor");
    setCurrentColor("bgColor");
  };

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

  useEffect(() => {
    if (bgColor && textColor) {
      const contrastValue = contrast(textColor, bgColor);
      setColorContrast(contrastValue);
      setTextResult(getTextRating());
      setHeadingResult(getHeadingRating());
    }
  }, [bgColor, textColor]);

  return (
    <main className="container w-[80%] mx-auto">
      <section className="flex justify-between items-end">
        {/* color picker */}
        <div className="flex-grow mr-3">
          <div className="flex justify-between">
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
              <p>
                {" "}
                <span>Color contrast:</span>
                <span className="font-medium text-2xl pl-2">
                  {colorContrast}
                </span>
              </p>
            </div>
            <div className="space-x-8 self-end">
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
                    color: textResult === "FAIL" ? "rgb(220 38 38)" : "green",
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
        <div className="mb-9">
          <div className="">
            <div
              className="w-52 h-52"
              style={{ backgroundColor: textColor, color: bgColor }}
              onClick={() => setCurrentColor("textColor")}
            >
              <span>Text Color</span>
            </div>
            <span>{textColor}</span>
            <div
              className="w-52 h-52"
              style={{ backgroundColor: bgColor, color: textColor }}
              onClick={() => setCurrentColor("bgColor")}
            >
              <span>Background Color</span>
            </div>
            <span>{bgColor}</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
