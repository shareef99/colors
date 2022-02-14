import { Result } from "../../lib/interface";
import SlightSlope from "./SlightSlope";
import { getRandomColor } from "../../lib/helper/colorConverter";

interface Props {
  bgColor: string;
  textColor: string;
  headingResult: Result;
  textResult: Result;
  onBgColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
}

const Content = ({
  bgColor,
  textColor,
  headingResult,
  textResult,
  onBgColorChange,
  onTextColorChange,
}: Props) => {
  return (
    <>
      <SlightSlope bgColor={bgColor} position="top" />
      <section
        className="py-28 px-4 xs:px-[10%]"
        style={{
          background: bgColor,
          color: textColor,
        }}
      >
        <div className="flex">
          <div className="flex flex-col pr-4 text-center font-semibold">
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
          <h1 className="text-4xl font-black xs:text-5xl">
            Why choosing Good Colors is important.
          </h1>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col pr-4 text-center font-semibold">
            <span className={`${textResult === "FAIL" ? "line-through" : ""}`}>
              AA
            </span>
            <span className={`${textResult === "AAA" ? "" : "line-through"}`}>
              AAA
            </span>
          </div>
          <div>
            <p className="strong py-5 text-lg font-medium italic">
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
          <h2 className="text-3xl font-bold">Colour contrast</h2>
          <p className="pt-5">
            For digital accessibility, the concept of color contrast is as
            critical as it is simple. Color contrast refers to the difference in
            light between foreground and its background. By using
            sufficiently-contrasting colors you are making sure that the great
            content you&apos;ve developed for your website can be read by
            everyone.
          </p>
        </div>

        <div className="text-xl">
          <blockquote
            className="rounded-tl-sm rounded-bl-sm border-l-4 pl-4 xs:pl-8 sm:pl-10"
            style={{ borderColor: textColor }}
          >
            how to{" "}
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:opacity-90 hover:duration-500 hover:ease-in"
            >
              calculate Color Contrast
            </a>
          </blockquote>
          <br />
          <blockquote
            className="flex flex-col rounded-tl-sm rounded-bl-sm border-l-4 pl-4 xs:pl-8 sm:pl-10"
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

        <div className="flex flex-col pt-10 font-medium">
          <span className="pb-3">Random Colors</span>
          <div>
            <button
              className="mx-0 rounded-md border-2 px-3 py-1"
              style={{
                borderColor: textColor,
                color: bgColor,
                backgroundColor: textColor,
              }}
              onClick={() => onBgColorChange(getRandomColor())}
            >
              Background
            </button>
            <button
              className="mx-4 rounded-md border-2 px-4 py-1"
              style={{ borderColor: textColor }}
              onClick={() => onTextColorChange(getRandomColor())}
            >
              Text
            </button>
          </div>
        </div>
      </section>
      <SlightSlope bgColor={bgColor} position="bottom" />
    </>
  );
};

export default Content;
