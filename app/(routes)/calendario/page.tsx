import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";

const CalendarPage = () => {
  return (
    <>
      <div className="flex">
        <Calendar />
        <EventForm />
      </div>
    </>
  );
};

export default CalendarPage;
