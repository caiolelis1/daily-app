import { Button } from "@/components/ui/button";
import GoalItem from "./GoalItem";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GoalForm from "./GoalForm";
import { FinancialGoals } from "@prisma/client";

interface GoalsTabProps {
  goals: FinancialGoals[];
}

const GoalsTab = ({ goals }: GoalsTabProps) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="w-full flex justify-between items-center">
        <p>{goals.length} encontrado(s)</p>
        <Dialog>
          <DialogTrigger>
            <Button>Criar novo</Button>
          </DialogTrigger>
          <GoalForm />
        </Dialog>
      </div>
      {goals.map((goal) => (
        <GoalItem goal={goal} />
      ))}
    </div>
  );
};

export default GoalsTab;
