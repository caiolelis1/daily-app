"use client";

import clsx from "clsx";
import { compareDesc, format, isToday } from "date-fns";
import EventCard from "./EventCard";

import { Event } from "@/app/types";
import { Day } from "@prisma/client";
import { cn } from "@/lib/utils";

interface DayProps {
  day: Date;
  events: Event[];
  grade: Day[];
  onClick: (day: Date) => void;
}

const Day = ({ onClick, grade, day, events }: DayProps) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col gap-2 border rounded-md p-2 h-40 overflow-auto cursor-pointer hover:opacity-75 items-start",
        isToday(day) && "bg-gray-200 text-gray-900"
      )}
      onClick={() => onClick(day)}
    >
      {grade.length > 0 && (
        <div
          className={cn(
            "absolute block top-0 right-0 border-l-transparent border-l-[48px] border-t-[48px] z-10",
            grade[0].grade == 1 && "border-t-red-500",
            grade[0].grade == 2 && "border-t-orange-500",
            grade[0].grade == 3 && "border-t-yellow-500",
            grade[0].grade == 4 && "border-t-lime-500",
            grade[0].grade == 5 && "border-t-green-500"
          )}
        />
      )}
      <span>{format(day, "d")}</span>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Day;
