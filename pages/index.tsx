import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";

export default function Home() {
  const [currentColor, setCurrentColor] = useState<"bgColor" | "textColor">(
    "bgColor"
  );
  const [bgColor, setBgColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");

  const changeColor = () => {
    if (currentColor === "bgColor") return setCurrentColor("textColor");
    setCurrentColor("bgColor");
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
              <RgbaStringColorPicker
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
                onClick={() => setCurrentColor("textColor")}
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
