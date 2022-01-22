type Props = {
  bgColor: string;
};

const SlightSlope = ({ bgColor }: Props) => {
  return (
    <div className="rotate-180 h-14 relative -z-50 -mt-28">
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
        className="w-full h-full"
      >
        <polygon points="0,0 0,94 293,0 "></polygon>
      </svg>
    </div>
  );
};

export default SlightSlope;
