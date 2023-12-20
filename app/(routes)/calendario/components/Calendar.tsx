"use client";

import { useEffect, useMemo, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import Day from "./Day";
import { Event, EventType } from "@/app/types";
import clsx from "clsx";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const TYPES_COLORS = [
  "bg-pink-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-sky-500",
  "bg-teal-500",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-red-500",
];
interface CalendarProps {
  events: Event[];
  types: EventType[];
}

const Calendar = ({ events: eventsData, types }: CalendarProps) => {
  const [activeTypes, setActiveTypes] = useState<string[]>([]);

  const handleActiveItems = (type: string) => {
    if (activeTypes.includes(type)) {
      setActiveTypes(activeTypes.filter((auxType) => auxType !== type));
    } else {
      setActiveTypes((current) => [...current, type]);
    }
  };

  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  const eventsByDate = useMemo(() => {
    return eventsData.reduce((acc: { [key: string]: Event[] }, event) => {
      const dateKey = format(event.datetime, "dd-MM-yyyy");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [eventsData]);

  return (
    <div className="container mx-auto h-screen overflow-y-auto scrollbar-none p-4">
      <div className="mb-4">
        <h2 className="text-center capitalize text-3xl font-bold">
          {format(currentDate, "MMMM yyyy", { locale: ptBR })}
        </h2>
      </div>
      <div className="flex mb-2 gap-2">
        {types.map((type, index) => {
          const active = activeTypes.includes(type.id);
          return (
            <div
              key={type.id}
              className={clsx(
                "flex cursor-pointer border-2 rounded-xl px-2 py-1 items-center gap-2",
                active && "bg-slate-800 text-white"
              )}
              onClick={() => handleActiveItems(type.id)}
            >
              <div className={`h-4 w-8 ${TYPES_COLORS[index]}`} />
              <span className="">{type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center font-bold mb-4">
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {daysInMonth.map((day, index) => {
          const dateKey = format(day, "dd-MM-yyyy");
          let todayEvents;

          if (activeTypes.length === 0) {
            todayEvents = eventsByDate[dateKey] || [];
          } else {
            todayEvents =
              eventsByDate[dateKey]?.filter((auxEvent) =>
                activeTypes.includes(auxEvent.typeId)
              ) || [];
          }

          return (
            <Day
              key={index}
              day={day}
              currentDate={currentDate}
              events={todayEvents}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
