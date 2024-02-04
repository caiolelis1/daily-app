import useCalendar from "@/app/context/CalendarContext";
import useTodayEvents from "@/app/hooks/calendar/useTodayEvents";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleEllipsis, XCircle } from "lucide-react";

interface DayModalProps {
  day: Date;
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
const DayModal = ({ day }: DayModalProps) => {
  const { events } = useCalendar();

  const todayEvents = useTodayEvents(events, day);
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
          {(todayEvents === undefined || todayEvents?.length == 0) && (
            <p>Sem eventos para o dia.</p>
          )}
          {todayEvents?.map((event) => (
            <div
              className={`flex justify-between items-center rounded-md p-2 ${
                TYPES_COLORS[event.typeIdIndex]
              }`}
            >
              <div>
                {event.allDay ? (
                  <p>{event.description}</p>
                ) : (
                  <p>
                    {format(event.datetime, "HH:mm")} - {event.description}
                  </p>
                )}
              </div>
              <div className="flex gap-1">
                <CircleEllipsis className="cursor-pointer" />
                <AlertDialog>
                  <AlertDialogTrigger>
                    <XCircle className="cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Este evento será
                        permanentemente deletado.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
  );
};

export default DayModal;
