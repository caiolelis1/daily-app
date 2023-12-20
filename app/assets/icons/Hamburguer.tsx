interface HamburguerProps {
  onClick?: (value: React.SetStateAction<boolean>) => void;
}

export default function Hamburguer({ onClick }: HamburguerProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(true);
    }
  };

  return (
    <div
      className="flex cursor-pointer border rounded-md p-2"
      onClick={() => handleClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="black"
        className="mx-auto w-6 h-6 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
}
