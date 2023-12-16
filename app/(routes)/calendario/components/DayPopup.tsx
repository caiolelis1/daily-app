interface DayPopupProps {
  day: number;
}

const DayPopup = ({ day }: DayPopupProps) => {
  return <div className="fixed">{day}</div>;
};

export default DayPopup;
