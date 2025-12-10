// CheckIcon.tsx
interface CheckIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;  // ← DODAJ
  className?: string;           // ← DODAJ
}

export const CheckIcon = ({ 
  size = 18, 
  color = "currentColor", 
  strokeWidth = 2,
  style,      // ← DODAJ
  className   // ← DODAJ
}: CheckIconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}       // ← DODAJ
    className={className} // ← DODAJ
  >
    <path 
      d="M20 6 9 17l-5-5" 
      stroke={color} 
      strokeWidth={strokeWidth}
      strokeLinecap="round" 
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);