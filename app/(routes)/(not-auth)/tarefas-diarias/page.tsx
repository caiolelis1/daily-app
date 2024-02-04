import DailyTasksList from "./components/daily/DailyTasksList";
import TodayTasksList from "./components/today/TodayTasksList";

const DailyTasks = () => {
  return (
    <div className="flex gap-40">
      <DailyTasksList />
      <TodayTasksList />
    </div>
  );
};

export default DailyTasks;
