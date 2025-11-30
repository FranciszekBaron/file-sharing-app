export const DocumentIcon = ({ 
  className = "", 
  size = 24,
  color = "#1a73e8" 
}: { 
  className?: string; 
  size?: number;
  color?: string;
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
      <path
        d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
        fill={color}
      />
      <path
        d="M14 2V8H20"
        fill="white"
      />
      <path
        d="M8 12H16V14H8V12Z"
        fill="white"
      />
      <path
        d="M8 16H16V18H8V16Z"
        fill="white"
      />
    </svg>
  );
};
