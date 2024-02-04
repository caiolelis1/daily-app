import { EventWithTypeIndex } from "@/app/types";
import { format } from "date-fns";
import { useMemo } from "react";

const useTodayEvents = (events: EventWithTypeIndex[], day: Date) => {
  const eventsByDate = useMemo(() => {
    return events.reduce(
      (acc: { [key: string]: EventWithTypeIndex[] }, event) => {
        let dateKey = "";
        if (event.datetime) dateKey = format(event.datetime, "dd-MM-yyyy");
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        return acc;
      },
      {}
    );
  }, [events]);
  let todayEvents: EventWithTypeIndex[] = [];

  if (day) {
    const dateKey = format(day, "dd-MM-yyyy");
    todayEvents = eventsByDate[dateKey] || [];
  }

  return todayEvents;
};

export default useTodayEvents;
