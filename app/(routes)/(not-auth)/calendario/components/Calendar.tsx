"use client";

import { useEffect, useState } from "react";

import useEvents from "@/app/context/CalendarContext";
import useDateFns from "@/app/hooks/calendar/useDateFns";

import { Day, TypeEvent } from "@prisma/client";
import { EventWithTypeIndex } from "@/app/types";

import Month from "./calendar/Month";
import DaysGrid from "./calendar/DaysGrid";
import FilterType from "./calendar/FiterType";
import EventForm from "./EventForm";

interface CalendarProps {
  events: EventWithTypeIndex[];
  types: TypeEvent[];
  grades: Day[];
}

const Calendar = ({ events: eventsData, types, grades }: CalendarProps) => {
  const { currentDate } = useDateFns();
  const { setEvents, setGrades } = useEvents();

  const [date, setDate] = useState(currentDate);

  useEffect(() => {
    setEvents(eventsData); //TODO: set reduced events by date
  }, [eventsData]);

  useEffect(() => {
    setGrades(grades);
  });

  const handleDate = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Month date={date} setDate={handleDate} />
      <div className="flex w-full justify-between px-3">
        <FilterType types={types} />
        <EventForm types={types} />
      </div>
      <DaysGrid date={date} />
    </div>
  );
};

export default Calendar;
