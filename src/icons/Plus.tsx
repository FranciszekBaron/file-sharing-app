export const PlusIcon = ({ size = 18, color = "currentColor", strokeWidth = 2 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 12h14" 
      stroke={color} 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
    <path 
      d="M12 5v14" 
      stroke={color} 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);