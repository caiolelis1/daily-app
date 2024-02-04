import useEvents from "@/app/context/CalendarContext";
import EventComponent from "./Event";
import useTodayEvents from "@/app/hooks/calendar/useTodayEvents";

interface EventListProps {
  day: Date;
}

const EventList = ({ day }: EventListProps) => {
  const { events } = useEvents();

  const todayEvents = useTodayEvents(events, day);

  return (
    <div className="flex flex-col gap-2 w-full">
      {todayEvents.map((event) => (
        <EventComponent event={event} />
      ))}
    </div>
  );
};

export default EventList;
