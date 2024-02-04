import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Day, Event } from "@prisma/client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ModalForm from "./ModalForm";
import DayGrade from "./DayGrade";
import { EventWithTypeIndex } from "@/app/types";

interface DayModalProps {
  day: Date | null;
  grade: Day[];
  events: EventWithTypeIndex[];
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

const DayModal = ({ day, grade, events }: DayModalProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Dia {day && format(day, "PPP", { locale: ptBR })}
        </DialogTitle>
      </DialogHeader>
      <div className="border rounded-md p-4">
        <h2 className="font-bold text-md">EVENTOS</h2>
        <div className="flex flex-col gap-2 mt-3">
          {(events === undefined || events?.length == 0) && (
            <p>Sem eventos para o dia.</p>
          )}
          {events?.map((event) => (
            <div
              className={`flex justify-between items-center rounded-md p-2 ${
                TYPES_COLORS[event.typeIdIndex]
              }`}
            >
              <p>
                {format(event.datetime, "HH:mm")} - {event.description}
              </p>
              {/* <div className="flex justify-center items-center cursor-pointer rounded-full border border-black w-5 h-5 hover:bg-red-600 hover:border-red-600 hover:text-white">
                <span>x</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {grade ? <DayGrade grade={grade} /> : <ModalForm day={day} />}
    </DialogContent>
  );
};

export default DayModal;
