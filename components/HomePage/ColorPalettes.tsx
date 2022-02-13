import { ColorPalette, ColorType } from "../../lib/interface";

interface Props {
  colorPalettes: ColorPalette;
  typesOfColor: Array<ColorType>;
}

const ColorPalettes = ({ colorPalettes, typesOfColor }: Props) => {
  return (
    <div className="my-5 space-y-[16px]">
      {colorPalettes &&
        colorPalettes.map((palette) => (
          <div key={Math.random()}>
            <h3 className="font-medium pb-2">{palette.paletteName}</h3>
            <div className="flex">
              {palette.colors.map((color) => (
                <div key={Math.random()}>
                  <div
                    style={{ backgroundColor: color.rgb }}
                    className="h-28 w-28"
                  ></div>
                  <div className="flex flex-col w-36">
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
