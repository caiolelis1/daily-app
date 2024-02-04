"use client";

import { add, format, sub } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthProps {
  date: Date;
  setDate: (date: Date) => void;
}

const Month = ({ date, setDate }: MonthProps) => {
  const addMonth = (toAdd: boolean) => {
    if (toAdd) {
      setDate(
        add(date, {
          months: 1,
        })
      );
    } else {
      setDate(
        sub(date, {
          months: 1,
        })
      );
    }
  };
  return (
    <div className="flex justify-center gap-20 items-center">
      <ChevronLeft className="cursor-pointer" onClick={() => addMonth(false)} />
      <h2 className="text-center capitalize text-3xl font-bold w-60">
        {format(date, "MMMM yyyy", { locale: ptBR })}
      </h2>
      <ChevronRight className="cursor-pointer" onClick={() => addMonth(true)} />
    </div>
  );
};

export default Month;
