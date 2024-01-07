import Calendar from "./components/Calendar";
import getTypes from "@/app/actions/getTypes";
import getEvents from "@/app/actions/getEvents";
import getDayGrades from "@/app/actions/getDayGrades";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/SidebarContext";

const CalendarPage = async () => {
  const types = await getTypes();
  const events = await getEvents();
  const dayGrades = await getDayGrades();

  return (
    <div className="flex flex-col lg:flex-row">
      <Calendar events={events} types={types} dayGrades={dayGrades} />
      {/* <EventForm types={types} /> */}
    </div>
  );
};

export default CalendarPage;
