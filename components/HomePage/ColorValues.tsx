import { ChangeEvent } from "react";
import {
  colorConverter,
  convertColorToRgbObject,
} from "../../lib/helper/colorConverter";
import { ColorType } from "../../lib/interface";

interface Props {
  typesOfColor: Array<ColorType>;
  bgColor: string;
  textColor: string;
  currentColor: "bgColor" | "textColor";
  onRgbColorChange: (e: ChangeEvent<HTMLInputElement>, x: string) => void;
}

const ColorValues = ({
  typesOfColor,
  textColor,
  bgColor,
  currentColor,
  onRgbColorChange,
}: Props) => {
  return (
    <div
      className="ml-2 mt-2 flex flex-col"
      style={{ color: currentColor === "bgColor" && textColor }}
    >
      {typesOfColor.map((colorType) => (
        <div key={colorType}>
          {colorType === "rgb" ? (
            <div className="flex text-center">
              <div>
                <span>r:</span>
                <input
                  type="text"
                  className="m-0 w-8 cursor-pointer border-0 bg-transparent p-0 text-center"
                  value={
                    convertColorToRgbObject(
                      currentColor === "bgColor" ? bgColor : textColor
                    ).r
                  }
                  onChange={(e) => onRgbColorChange(e, "r")}
                />
              </div>
              <div>
                <span>g:</span>
                <input
                  type="text"
                  value={
                    convertColorToRgbObject(
                      currentColor === "bgColor" ? bgColor : textColor
                    ).g
                  }
                  className="m-0 w-8 cursor-pointer border-0 bg-transparent p-0 text-center"
                  onChange={(e) => onRgbColorChange(e, "g")}
                />
              </div>
              <div>
                <span>b:</span>
                <input
                  type="text"
                  value={
                    convertColorToRgbObject(
                      currentColor === "bgColor" ? bgColor : textColor
                    ).b
                  }
                  className="m-0 w-8 cursor-pointer border-0 bg-transparent p-0 text-center"
                  onChange={(e) => onRgbColorChange(e, "b")}
                />
              </div>
            </div>
          ) : colorType === "hsl" ? (
            colorConverter(
              currentColor === "bgColor" ? bgColor : textColor,
              "hsl"
            )
          ) : colorType === "hex" ? (
            colorConverter(
              currentColor === "bgColor" ? bgColor : textColor,
              "hex"
            )
          ) : (
            colorConverter(
              currentColor === "bgColor" ? bgColor : textColor,
              "cmyk"
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorValues;
