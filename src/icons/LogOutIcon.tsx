export const LogOutIcon = ({ 
  className = "", 
  size = 24,
  color = "currentColor",
  strokeWidth = 2
}: { 
  className?: string; 
  size?: number;
  color?: string;
  strokeWidth?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path 
        d="m16 17 5-5-5-5"
        vectorEffect="non-scaling-stroke"
      />
      <path 
        d="M21 12H9"
        vectorEffect="non-scaling-stroke"
      />
      <path 
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};