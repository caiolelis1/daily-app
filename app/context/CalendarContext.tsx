"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { EventWithTypeIndex } from "../types";

type CalendarState = {
  events: EventWithTypeIndex[];
  activeTypes: string[];
  setEvents(events: EventWithTypeIndex[]): void;
  handleActiveTypes: (type: string) => void;
};

const CalendarContext = createContext<CalendarState | null>(null);

const useCalendar = (): CalendarState => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("Error no calendar provider");
  }

  return context;
};

export default useCalendar;

export const CalendarProvider = (props: PropsWithChildren) => {
  const [events, setEvents] = useState<EventWithTypeIndex[]>([]);
  const [activeTypes, setActiveTypes] = useState<string[]>([]);

  const handleActiveTypes = (type: string) => {
    if (activeTypes.includes(type)) {
      setActiveTypes(activeTypes.filter((auxType) => auxType !== type));
    } else {
      setActiveTypes((current) => [...current, type]);
    }
  };

  return (
    <CalendarContext.Provider
      value={{ events, setEvents, activeTypes, handleActiveTypes }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};
