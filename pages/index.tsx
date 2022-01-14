import Head from "next/head";
import { Fragment, useState } from "react";
import { RgbColor, RgbStringColorPicker } from "react-colorful";

export default function Home() {
  const [currentColor, setCurrentColor] = useState<"bgColor" | "textColor">(
    "bgColor"
  );
  const [bgColor, setBgColor] = useState<string>("rgb(98, 135, 193)");
  const [textColor, setTextColor] = useState<string>("rgb(44, 45, 45)");

  const changeColor = () => {
    if (currentColor === "bgColor") return setCurrentColor("textColor");
    setCurrentColor("bgColor");
  };

  const convertColorToRgbObject = (color: string): RgbColor => {
    const rgb = color.match(/\d+/g);
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

  const contrast = (textColor: RgbColor, bgColor: RgbColor): number => {
    const lum1 = getLuminance(textColor);
    const lum2 = getLuminance(bgColor);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;
  };

  return (
    <Fragment>
      <Head>
        <title>Good Colors | Shareef</title>
        <meta
          name="description"
          content="A website to help choose color schema for your website"
        />
      </Head>
      <main>
        <section>
          <div className="flex justify-center">
            <div className="color-picker">
              <RgbStringColorPicker
                color={currentColor === "bgColor" ? bgColor : textColor}
                onChange={
                  currentColor === "bgColor" ? setBgColor : setTextColor
                }
              />
            </div>
            <div className="">
              <div
                className="w-52 h-52"
                style={{ backgroundColor: textColor, color: bgColor }}
                onClick={() => {
                  setCurrentColor("textColor");
                  console.log(convertColorToRgbObject(bgColor), bgColor);
                  console.log(convertColorToRgbObject(textColor), textColor);
                  console.log(
                    contrast(
                      convertColorToRgbObject(textColor),
                      convertColorToRgbObject(bgColor)
                    )
                  );
                }}
              >
                <span>Text Color</span>
              </div>
              <div
                className="w-52 h-52"
                style={{ backgroundColor: bgColor, color: textColor }}
                onClick={() => setCurrentColor("bgColor")}
              >
                <span>Background Color</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}
