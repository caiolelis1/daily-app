import { FieldValues, UseFormRegister } from "react-hook-form";

interface DateInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
}

const DateInput = ({ id, register }: DateInputProps) => {
  return <input type="datetime-local" className=" " {...register(id)} />;
};

export default DateInput;
