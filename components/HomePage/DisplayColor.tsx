interface Props {
  noOfColors: number;
  textColor: string;
  bgColor: string;
  label: string;
  onColorChange: () => void;
}

const DisplayColor = ({
  noOfColors,
  bgColor,
  textColor,
  label,
  onColorChange,
}: Props) => {
  return (
    <div
      className={`flex w-56 items-center justify-center rounded shadow-md ${
        noOfColors === 0
          ? "h-[216px]"
          : noOfColors === 1
          ? "h-48"
          : noOfColors === 2
          ? "h-[168px]"
          : noOfColors === 3
          ? "h-36"
          : "h-[120px]"
      }`}
      style={{
        backgroundColor: label === "Text Color" ? textColor : bgColor,
        color: label === "Text Color" ? bgColor : textColor,
      }}
      onClick={onColorChange}
    >
      <span className="inline-block">{label}</span>
    </div>
  );
};

export default DisplayColor;
