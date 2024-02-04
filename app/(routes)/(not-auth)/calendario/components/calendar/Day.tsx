"use client";

import { format, isToday } from "date-fns";

import { cn } from "@/lib/utils";
import EventList from "./EventList";
import useCalendar from "@/app/context/CalendarContext";
import useTodayGrade from "@/app/hooks/calendar/useTodayGrade";

interface DayProps {
  day: Date;
  onClick: (day: Date) => void;
}

const Day = ({ onClick, day }: DayProps) => {
  const { grades } = useCalendar();

  const todayGrade = useTodayGrade(grades, day);

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 border rounded-md p-2 h-48 overflow-auto cursor-pointer hover:opacity-75 items-start",
        isToday(day) && "bg-gray-200 text-gray-900"
      )}
      onClick={() => onClick(day)}
    >
      {todayGrade.length > 0 && (
        <div
          className={cn(
            "absolute block top-0 right-0 border-l-transparent border-l-[48px] border-t-[48px] z-10",
            todayGrade[0].grade == 1 && "border-t-red-500",
            todayGrade[0].grade == 2 && "border-t-orange-500",
            todayGrade[0].grade == 3 && "border-t-yellow-500",
            todayGrade[0].grade == 4 && "border-t-lime-500",
            todayGrade[0].grade == 5 && "border-t-green-500"
          )}
        />
      )}

      <span>{format(day, "d")}</span>
      <div className="w-full">
        <EventList day={day} />
      </div>
    </div>
  );
};

export default Day;
