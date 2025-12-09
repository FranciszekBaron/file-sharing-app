export const ListIcon = ({ size = 18, color = "currentColor", strokeWidth = 2.5 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 23 23" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line 
      x1="5" y1="6" x2="20" y2="6" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
    <line 
      x1="5" y1="12" x2="20" y2="12" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
    <line 
      x1="5" y1="18" x2="20" y2="18" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);