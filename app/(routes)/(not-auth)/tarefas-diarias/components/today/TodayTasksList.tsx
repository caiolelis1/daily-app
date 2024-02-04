"use client";

import useDateFns from "@/app/hooks/calendar/useDateFns";
import TodayTaskItem from "./TodayTaskItem";
import { format } from "date-fns";

interface TodayTasksListProps {}

const TodayTasksList = ({}: TodayTasksListProps) => {
  const { currentDate } = useDateFns();
  return (
    <div>
      <h2 className="font-semibold text-4xl text-center">
        Tarefas diárias de hoje ({format(currentDate, "dd/MM")})
      </h2>
      <ul>
        <TodayTaskItem />
        <TodayTaskItem />
        <TodayTaskItem />
        <TodayTaskItem />
      </ul>
    </div>
  );
};

export default TodayTasksList;
