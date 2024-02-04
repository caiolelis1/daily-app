import getTypes from "@/app/actions/getActions/getTypes";
import getEvents from "@/app/actions/getActions/getEvents";
import getDayGrades from "@/app/actions/getActions/getDayGrades";
import { CalendarProvider } from "@/app/context/CalendarContext";
import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";

const CalendarPage = async () => {
  const types = await getTypes();
  const events = await getEvents();
  const grades = await getDayGrades();

  return (
    <div className="flex flex-col p-6 overflow-x-none">
      <CalendarProvider>
        <EventForm />
        <Calendar events={events} types={types} grades={grades} />
      </CalendarProvider>
    </div>
  );
};

export default CalendarPage;
