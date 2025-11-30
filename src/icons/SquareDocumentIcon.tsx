export const SquareDocumentIcon = ({ 
  className = "", 
  size = 24,
  bgColor = "#1a73e8",
  lineColor = "white"
}: { 
  className?: string; 
  size?: number;
  bgColor?: string;
  lineColor?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        fill={bgColor}
      />
      <rect
        x="6"
        y="7"
        width="12"
        height="2"
        fill={lineColor}
      />
      <rect
        x="6"
        y="11"
        width="12"
        height="2"
        fill={lineColor}
      />
      <rect
        x="6"
        y="15"
        width="8"
        height="2"
        fill={lineColor}
      />
    </svg>
  );
};
