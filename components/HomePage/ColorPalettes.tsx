import { ColorPalette, ColorType } from "../../lib/interface";

interface Props {
  colorPalettes: ColorPalette;
  typesOfColor: Array<ColorType>;
  color: string;
}

const ColorPalettes = ({ colorPalettes, typesOfColor, color }: Props) => {
  return (
    <div className="my-5 space-y-[16px]">
      {colorPalettes &&
        colorPalettes.map((palette) => (
          <div key={Math.random()}>
            <h3 className="flex items-center pb-2 font-medium">
              <div
                style={{ backgroundColor: color }}
                className="mr-2 h-5 w-5 rounded-full"
              ></div>{" "}
              {palette.paletteName}{" "}
            </h3>
            <div className="flex flex-wrap justify-center sm:justify-start">
              {palette.colors.map((color) => (
                <div key={Math.random()}>
                  <div
                    style={{ backgroundColor: color.rgb }}
                    className="h-28 w-28"
                  ></div>
                  <div className="flex w-36 flex-col">
                    {typesOfColor.map((value) => (
                      <div key={Math.random()}>
                        {value === "rgb"
                          ? color.rgb
                          : value === "hex"
                          ? color.hex
                          : value === "hsl"
                          ? color.hsl
                          : color.cmyk.replaceAll("NaN", "0")}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ColorPalettes;
