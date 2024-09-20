import { useState } from "react";

import { cn } from "@/lib/utils";
import useEvents from "@/app/context/CalendarContext";
import { TypeEvent } from "@prisma/client";

interface FilterTypeProps {
  types: TypeEvent[];
}

const FilterType = ({ types }: FilterTypeProps) => {
  const { activeTypes, handleActiveTypes } = useEvents();
  console.log(types);

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
            <div className="h-4 w-8" style={{ backgroundColor: type.color }} />
            <span className="">{type.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FilterType;
