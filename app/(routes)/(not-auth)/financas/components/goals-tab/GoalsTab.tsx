import { Button } from "@/components/ui/button";
import GoalItem from "./GoalItem";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GoalForm from "./GoalForm";
import { FinancialGoals } from "@prisma/client";
import { PlusCircle } from "lucide-react";

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
            <Button variant="default" className="flex gap-2">
              <PlusCircle />
              <span>Criar novo</span>
            </Button>
          </DialogTrigger>
          <GoalForm />
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};

export default GoalsTab;
