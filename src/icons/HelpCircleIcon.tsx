export const HelpCircleIcon = ({ size = 18, color = "currentColor", strokeWidth = 2 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke={color} 
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
    />
    <path 
      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" 
      stroke={color} 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
    <path 
      d="M12 17h.01" 
      stroke={color} 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);