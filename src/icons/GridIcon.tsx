export const GridIcon = ({ size = 18, color = "currentColor", strokeWidth = 2.5 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Lewy górny */}
    <rect 
      x="3" y="3" width="6" height="6" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      rx="1"
      vectorEffect="non-scaling-stroke"
    />
    {/* Prawy górny */}
    <rect 
      x="14" y="3" width="6" height="6" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      rx="1"
      vectorEffect="non-scaling-stroke"
    />
    {/* Lewy dolny */}
    <rect 
      x="3" y="14" width="6" height="6" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      rx="1"
      vectorEffect="non-scaling-stroke"
    />
    {/* Prawy dolny */}
    <rect 
      x="14" y="14" width="6" height="6" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      rx="1"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);