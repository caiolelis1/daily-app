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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DayModal from "./DayModal";
import { Day as DayGrade } from "@prisma/client";

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
  dayGrades: DayGrade[];
}

const Calendar = ({ dayGrades, events: eventsData, types }: CalendarProps) => {
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [dayInModal, setDayInModal] = useState<Date | null>(null);
  const [gradeInModal, setGradeInModal] = useState<DayGrade[]>([]);

  const handleActiveItems = (type: string) => {
    if (activeTypes.includes(type)) {
      setActiveTypes(activeTypes.filter((auxType) => auxType !== type));
    } else {
      setActiveTypes((current) => [...current, type]);
    }
  };

  const currentDate = new Date();
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

  const gradeByDate = useMemo(() => {
    return dayGrades.reduce((acc: { [key: string]: DayGrade[] }, dayGrade) => {
      const dateKey = format(dayGrade.date, "dd-MM-yyyy");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(dayGrade);
      return acc;
    }, {});
  }, [dayGrades]);

  const handleDayClick = (day: Date) => {
    const dateKey = format(day, "dd-MM-yyyy");
    setDayInModal(day);
    setGradeInModal(gradeByDate[dateKey]);
  };

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
        <Dialog>
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
            let todayGrade;

            if (activeTypes.length === 0) {
              todayEvents = eventsByDate[dateKey] || [];
            } else {
              todayEvents =
                eventsByDate[dateKey]?.filter((auxEvent) =>
                  activeTypes.includes(auxEvent.typeId)
                ) || [];
            }
            todayGrade = gradeByDate[dateKey] || [];

            return (
              <DialogTrigger key={index}>
                <Day
                  day={day}
                  events={todayEvents}
                  grade={todayGrade}
                  onClick={handleDayClick}
                />
              </DialogTrigger>
            );
          })}
          <DayModal day={dayInModal} grade={gradeInModal} />
        </Dialog>
      </div>
    </div>
  );
};

export default Calendar;
