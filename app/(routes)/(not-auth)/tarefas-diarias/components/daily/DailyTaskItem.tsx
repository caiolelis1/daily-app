"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Task {
  nome: string;
  initialChecked: boolean;
  count: number;
  initialCount: number;
}

interface DailyTaskItemProps {
  task: Task;
}

const DailyTaskItem = ({ task }: DailyTaskItemProps) => {
  const [checked, setChecked] = useState<boolean>(task.initialChecked);
  const [timesChecked, setTimesChecked] = useState(task.initialCount);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (timesChecked === task.count) {
      setChecked(true);
      setDone(true);
    }
  }, [timesChecked]);

  return (
    <li>
      {task.count === 1 ? (
        <div className="flex gap-3 items-center">
          <Checkbox
            name=""
            id={task.nome}
            checked={checked}
            disabled={done}
            onCheckedChange={() => setTimesChecked((prev) => prev + 1)}
          />

          <label htmlFor={task.nome} className={cn(checked && "line-through")}>
            {task.nome}
          </label>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Checkbox
            name=""
            id={task.nome}
            checked={checked}
            disabled={done}
            onCheckedChange={() => setTimesChecked((prev) => prev + 1)}
          />

          <label htmlFor={task.nome} className={cn(checked && "line-through")}>
            {task.nome} - {timesChecked} / {task.count}
          </label>
        </div>
      )}
    </li>
  );
};

export default DailyTaskItem;
