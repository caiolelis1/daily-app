import { Day } from "@prisma/client";
import { format } from "date-fns";
import { useMemo } from "react";

const useTodayGrade = (grades: Day[], day: Date) => {
  const gradeByDate = useMemo(() => {
    return grades.reduce((acc: { [key: string]: Day[] }, dayGrade) => {
      const dateKey = format(dayGrade.date, "dd-MM-yyyy");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(dayGrade);
      return acc;
    }, {});
  }, [grades]);

  const dateKey = format(day, "dd-MM-yyyy");
  let todayGrade = gradeByDate[dateKey] || [];

  return todayGrade;
};

export default useTodayGrade;
