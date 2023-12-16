"use client";

import clsx from "clsx";
import { compareDesc, format, isToday } from "date-fns";
import EventCard from "./EventCard";
import useToggle from "@/app/hooks/useToggle";
import DayPopup from "./DayPopup";

interface Event {
  id: number;
  datetime: Date;
  description: string;
  type: number;
}

interface DayProps {
  day: Date;
  currentDate: Date;
  events: Event[];
}

const Day = ({ day, currentDate, events }: DayProps) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col gap-2 border rounded-md p-2 h-40 overflow-auto cursor-pointer hover:opacity-75",
        isToday(day) && "bg-gray-200 text-gray-900"
      )}
    >
      {compareDesc(day, currentDate) === 1 && !isToday(day) && (
        <div className="absolute block top-0 right-0 border-l-transparent border-l-[48px] border-t-gray-500 border-t-[48px] z-10" />
      )}

      {format(day, "d")}
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Day;
