import useDateFns from "@/app/hooks/calendar/useDateFns";
import Day from "./Day";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import DayModal from "./DayModel";
import { useState } from "react";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

interface DaysGridProps {
  date: Date;
}
const DaysGrid = ({ date }: DaysGridProps) => {
  const [dayInModal, setDayInModal] = useState<Date>();
  const { daysInMonth, startingDayIndex } = useDateFns(date);

  const handleDayClick = (day: Date) => {
    setDayInModal(day);
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {WEEKDAYS.map((day) => (
        <div key={day} className="text-center font-bold mb-4">
          {day}
        </div>
      ))}
      {Array.from({ length: startingDayIndex }).map((_, index) => (
        <div key={`empty-${index}`} />
      ))}
      <Dialog>
        {daysInMonth.map((day, index) => {
          return (
            <DialogTrigger key={day.toISOString()}>
              <Day day={day} onClick={handleDayClick} />
            </DialogTrigger>
          );
        })}
        <DayModal day={dayInModal} />
      </Dialog>
    </div>
  );
};

export default DaysGrid;
