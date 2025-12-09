export const SearchIcon = ({ size = 18, color = "currentColor", strokeWidth = 2 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle 
      cx="11" 
      cy="11" 
      r="8" 
      stroke={color} 
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
    />
    <path 
      d="m21 21-4.34-4.34" 
      stroke={color} 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);