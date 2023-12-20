import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";
import getTypes from "@/app/actions/getTypes";
import getEvents from "@/app/actions/getEvents";

const CalendarPage = async () => {
  const types = await getTypes();
  const events = await getEvents();

  return (
    <div className="flex">
      <Calendar events={events} types={types} />
      <EventForm types={types} />
    </div>
  );
};

export default CalendarPage;
