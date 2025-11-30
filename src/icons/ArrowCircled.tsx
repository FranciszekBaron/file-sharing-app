
interface Props {
    size?: number
}

export const ArrowCircled = ({size} : Props) => {
  return (
    <svg
      width={size}
      height={size}
    viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Niebieskie kółko w tle */}
      <circle cx="64" cy="64" r="64" fill="#C9E6FD" />
      
      {/* Strzałka */}
      <g stroke="#1D4973" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
        {/* Główna linia strzałki */}
        <line x1="64" y1="88" x2="64" y2="40"/>
        
        {/* Lewa linia grotu */}
        <line x1="64" y1="40" x2="40" y2="64" /> // lewa
        {/* Prawa linia grotu */}
        <line x1="64" y1="40" x2="88" y2="64" /> // prawa
      </g>
    </svg>
  );
};
