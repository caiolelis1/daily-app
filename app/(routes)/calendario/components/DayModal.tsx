import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ModalForm from "./ModalForm";
import { Day } from "@prisma/client";
import DayGrade from "./DayGrade";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface DayModalProps {
  day: Date | null;
  grade: Day[];
}

const DayModal = ({ day, grade }: DayModalProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Dia {day && format(day, "PPP", { locale: ptBR })}
        </DialogTitle>
      </DialogHeader>

      {grade ? <DayGrade grade={grade} /> : <ModalForm day={day} />}
    </DialogContent>
  );
};

export default DayModal;
