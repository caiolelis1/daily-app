"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Task {
  nome: string;
  initialChecked: boolean;
}

interface DailyTaskItemProps {
  task: Task;
}

const DailyTaskItem = ({ task }: DailyTaskItemProps) => {
  const [checked, setChecked] = useState<boolean>(task.initialChecked);
  return (
    <li className="flex gap-3 items-center">
      <Checkbox
        name=""
        id={task.nome}
        checked={checked}
        onCheckedChange={() => setChecked(!checked)}
      />

      <label htmlFor={task.nome} className={cn(checked && "line-through")}>
        {task.nome}
      </label>
    </li>
  );
};

export default DailyTaskItem;
