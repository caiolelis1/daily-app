import { Day } from "@prisma/client";

interface DayGradeProps {
  grade: Day[];
}

const DayGrade = ({ grade }: DayGradeProps) => {
  const dayGrade = grade[0];
  return (
    <div>
      <span>{dayGrade.grade}</span>
      <p>{dayGrade.description}</p>
    </div>
  );
};

export default DayGrade;
