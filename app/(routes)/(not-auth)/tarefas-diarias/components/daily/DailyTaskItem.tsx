"use client";

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
      <input
        type="checkbox"
        name=""
        id={task.nome}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label htmlFor={task.nome} className={cn(checked && "line-through")}>
        {task.nome}
      </label>
    </li>
  );
};

export default DailyTaskItem;
