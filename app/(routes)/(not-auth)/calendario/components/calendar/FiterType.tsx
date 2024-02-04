import { useState } from "react";

import { EventType } from "@/app/types";
import { cn } from "@/lib/utils";
import useEvents from "@/app/context/CalendarContext";

interface FilterTypeProps {
  types: EventType[];
}

const TYPES_COLORS = [
  "bg-pink-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-sky-500",
  "bg-teal-500",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-red-500",
];

const FilterType = ({ types }: FilterTypeProps) => {
  const { activeTypes, handleActiveTypes } = useEvents();

  return (
    <div className="flex gap-2">
      {types?.map((type, index) => {
        const active = activeTypes.includes(type.id);
        return (
          <div
            key={type.id}
            className={cn(
              "flex cursor-pointer border-2 rounded-xl px-2 py-1 items-center gap-2",
              active && "bg-slate-800 text-white border-slate-800"
            )}
            onClick={() => handleActiveTypes(type.id)}
          >
            <div className={`h-4 w-8 ${TYPES_COLORS[index]}`} />
            <span className="">{type.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FilterType;
