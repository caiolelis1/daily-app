import { cn } from "@/lib/utils";
import { useState } from "react";

interface TodayTaskItemProps {}

const TodayTaskItem = ({}: TodayTaskItemProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <li className="flex gap-3 items-center">
      <input
        type="checkbox"
        name=""
        id="cu"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label htmlFor="cu" className={cn(checked && "line-through")}>
        escovar os dentes sla
      </label>
    </li>
  );
};

export default TodayTaskItem;
