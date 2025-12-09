export const AppsIcon = ({ size = 18, color = "currentColor" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Górny rząd */}
    <circle cx="5" cy="5" r="2" fill={color} />
    <circle cx="12" cy="5" r="2" fill={color} />
    <circle cx="19" cy="5" r="2" fill={color} />
    
    {/* Środkowy rząd */}
    <circle cx="5" cy="12" r="2" fill={color} />
    <circle cx="12" cy="12" r="2" fill={color} />
    <circle cx="19" cy="12" r="2" fill={color} />
    
    {/* Dolny rząd */}
    <circle cx="5" cy="19" r="2" fill={color} />
    <circle cx="12" cy="19" r="2" fill={color} />
    <circle cx="19" cy="19" r="2" fill={color} />
  </svg>
);