import { Day } from "@prisma/client";

interface DayGradeProps {
  grade: Day[];
}

const DayGrade = ({ grade }: DayGradeProps) => {
  const dayGrade = grade[0];
  return (
    <div className="flex flex-col gap-2 p-6 ">
      <span>{dayGrade.grade}</span>
      <p>{dayGrade.description}</p>
    </div>
  );
};

export default DayGrade;
