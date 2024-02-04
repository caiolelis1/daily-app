"use client";

import { format, isToday } from "date-fns";

import { cn } from "@/lib/utils";
import EventList from "./EventList";

interface DayProps {
  day: Date;
  onClick: (day: Date) => void;
}

const Day = ({ onClick, day }: DayProps) => {
  console.log(day);
  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 border rounded-md p-2 h-48 overflow-auto cursor-pointer hover:opacity-75 items-start",
        isToday(day) && "bg-gray-200 text-gray-900"
      )}
      onClick={() => onClick(day)}
    >
      <span>{format(day, "d")}</span>
      <div className="w-full">
        <EventList day={day} />
      </div>
    </div>
  );
};

export default Day;
