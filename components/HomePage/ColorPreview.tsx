import { ChangeEvent } from "react";
import { Color, ColorType } from "../../lib/interface";
import ColorValues from "./ColorValues";
import DisplayColor from "./DisplayColor";

interface Props {
  textColor: string;
  bgColor: string;
  currentColor: Color;
  typesOfColor: Array<ColorType>;
  onHandleRgbColorChange: (e: ChangeEvent<HTMLInputElement>, x: string) => void;
  onColorChange: () => void;
}

const ColorPreview = ({
  bgColor,
  currentColor,
  textColor,
  typesOfColor,
  onHandleRgbColorChange,
  onColorChange,
}: Props) => {
  return (
    <div className={`${currentColor === "textColor" && "mb-4"}`}>
      <DisplayColor
        noOfColors={typesOfColor.length}
        textColor={textColor}
        bgColor={bgColor}
        label={currentColor === "bgColor" ? "Background Color" : "Text Color"}
        onColorChange={onColorChange}
      />
      <ColorValues
        typesOfColor={typesOfColor}
        textColor={textColor}
        bgColor={bgColor}
        currentColor={currentColor === "bgColor" ? "bgColor" : "textColor"}
        onRgbColorChange={onHandleRgbColorChange}
      />
    </div>
  );
};

export default ColorPreview;
