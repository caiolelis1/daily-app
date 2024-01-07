import GoalItem from "./GoalItem";

interface GoalsTabProps {}

const GoalsTab = ({}: GoalsTabProps) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <GoalItem />
      <GoalItem />
      <GoalItem />
      <GoalItem />
      <GoalItem />
      <GoalItem />
      <GoalItem />
    </div>
  );
};

export default GoalsTab;
