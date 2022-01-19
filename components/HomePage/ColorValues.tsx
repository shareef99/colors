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
    <div className="flex flex-col ml-2 mt-2">
      {typesOfColor.map((colorType) => (
        <span key={colorType}>
          {colorType === "rgb" ? (
            <div className="flex text-center">
              <div>
                <span>r:</span>
                <input
                  type="text"
                  className="w-8 text-center p-0 m-0 border-0 bg-transparent"
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
                  className="w-8 text-center p-0 m-0 border-0 bg-transparent"
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
                  className="w-8 text-center p-0 m-0 border-0 bg-transparent"
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
        </span>
      ))}
    </div>
  );
};

export default ColorValues;
