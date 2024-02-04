import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from "date-fns";

const useDateFns = (date?: Date) => {
  const currentDate = new Date();
  let firstDayOfMonth = startOfMonth(currentDate);
  let lastDayOfMonth = endOfMonth(currentDate);
  if (date) {
    firstDayOfMonth = startOfMonth(date);
    lastDayOfMonth = endOfMonth(date);
  }

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  return { currentDate, daysInMonth, startingDayIndex };
};

export default useDateFns;
