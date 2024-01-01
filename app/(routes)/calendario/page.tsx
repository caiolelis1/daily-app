import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";
import getTypes from "@/app/actions/getTypes";
import getEvents from "@/app/actions/getEvents";
import getDayGrades from "@/app/actions/getDayGrades";

const CalendarPage = async () => {
  const types = await getTypes();
  const events = await getEvents();
  const dayGrades = await getDayGrades();

  return (
    <div className="flex">
      <Calendar events={events} types={types} dayGrades={dayGrades} />
      <EventForm types={types} />
    </div>
  );
};

export default CalendarPage;
