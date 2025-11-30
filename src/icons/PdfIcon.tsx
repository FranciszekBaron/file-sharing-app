export const PdfIcon = ({ 
  size = 24 
}: { 
  size?: number 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Czerwony kwadrat z zaokrąglonymi rogami */}
    <rect 
      x="3" 
      y="3" 
      width="18" 
      height="18" 
      rx="2" 
      fill="#D93025"
    />
    
    {/* Tekst "PDF" */}
    <text
      x="12.2"
      y="14.5"
      fontFamily="Arial, sans-serif"
      fontSize="7"
      fontWeight="700"
      fill="white"
      textAnchor="middle"
    >
      PDF
    </text>
  </svg>
);