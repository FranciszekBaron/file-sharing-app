// icons/SortIcon.tsx
export const SortIcon = ({ size = 20, strokeWidth = 2 } : { 
  size?: number, 
  strokeWidth?: number 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    
    <line 
      x1="3" 
      y1="6" 
      x2="24" 
      y2="6" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
    />
    
    
    <line 
      x1="3" 
      y1="12" 
      x2="16" 
      y2="12" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
    />
    
    
    <line 
      x1="3" 
      y1="18" 
      x2="8" 
      y2="18" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
    />
  </svg>
);

//mozna pisac svg!!! ale super 