type Props = {
  bgColor: string;
  position: "top" | "bottom";
};

const SlightSlope = ({ bgColor, position }: Props) => {
  return (
    <div
      className={`relative -z-50 h-14 ${
        position === "top" ? "-mt-28 rotate-180" : "rotate-[270]"
      }`}
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 293 94"
        xmlSpace="preserve"
        preserveAspectRatio="none"
        fill={bgColor}
        className="h-full w-full"
      >
        <polygon points="0,0 0,94 293,0 "></polygon>
      </svg>
    </div>
  );
};

export default SlightSlope;
