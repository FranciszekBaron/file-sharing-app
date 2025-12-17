export const XIcon = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2 
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    vectorEffect="non-scaling-stroke"  // ← DODAJ TO TEŻ
  >
    <path 
      d="M18 6 6 18"
      vectorEffect="non-scaling-stroke"
    />
    <path 
      d="m6 6 12 12"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);