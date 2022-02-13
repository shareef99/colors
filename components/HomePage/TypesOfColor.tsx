import { ColorType } from "../../lib/interface";

interface Props {
  colorTypes: Array<ColorType>;
  onHandleColorTypeChange: (colorType: ColorType) => void;
  typesOfColor: Array<ColorType>;
  className?: string;
}

const TypesOfColor = ({
  colorTypes,
  onHandleColorTypeChange,
  typesOfColor,
  className,
}: Props) => {
  return (
    <div className="space-x-2">
      {colorTypes.map((colorType) => (
        <span
          onClick={() => onHandleColorTypeChange(colorType)}
          className={`cursor-pointer ${
            typesOfColor.includes(colorType) ? "text-blue" : "text-gray-500"
          } ${className}`}
          key={colorType}
        >
          {colorType}
        </span>
      ))}
    </div>
  );
};

export default TypesOfColor;
