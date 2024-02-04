"use client";

import useDateFns from "@/app/hooks/calendar/useDateFns";
import Month from "./calendar/Month";
import { useEffect, useState } from "react";
import DaysGrid from "./calendar/DaysGrid";
import { EventType, EventWithTypeIndex } from "@/app/types";
import useEvents from "@/app/context/CalendarContext";
import FilterType from "./calendar/FiterType";

interface CalendarProps {
  events: EventWithTypeIndex[];
  types: EventType[];
  grades: Day[];
}

const Calendar = ({ events: eventsData, types }: CalendarProps) => {
  const { currentDate } = useDateFns();
  const { setEvents } = useEvents();

  const [date, setDate] = useState(currentDate);

  useEffect(() => {
    setEvents(eventsData); //TODO: set reduced events by date
  }, [eventsData]);

  const handleDate = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="w-full">
      <Month date={date} setDate={handleDate} />
      <FilterType types={types} />
      <DaysGrid date={date} />
    </div>
  );
};

export default Calendar;
