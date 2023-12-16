"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import Day from "./Day";

import { eventsData } from "@/app/providers/EventsProvider";
import { useMemo } from "react";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const Calendar = () => {
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
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-center capitalize text-3xl font-bold">
          {format(currentDate, "MMMM yyyy", { locale: ptBR })}
        </h2>
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
          const todayEvents = eventsByDate[dateKey] || [];
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
