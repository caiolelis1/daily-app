"use client";

import { Button } from "@/components/ui/button";
import { FinancialGoals } from "@prisma/client";
import { useRouter } from "next/navigation";

interface GoalItemProps {
  goal: FinancialGoals;
}

const GoalItem = ({ goal }: GoalItemProps) => {
  const router = useRouter();
  return (
    <div className="border rounded-md shadow-lg p-6 cursor-pointer flex gap-6">
      <div>Imagem</div>
      <div>
        <h2>{goal.name}</h2>
        <h3>R$ {goal.value.toFixed(2)}</h3>
        <Button variant="link" onClick={() => router.push(goal.link || "")}>
          {goal.link}
        </Button>
      </div>
    </div>
  );
};

export default GoalItem;
