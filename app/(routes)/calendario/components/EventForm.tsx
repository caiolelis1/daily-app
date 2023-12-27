"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import DateInput from "@/app/components/inputs/DateInput";
import Input from "@/app/components/inputs/Input";
import SelectInput from "@/app/components/inputs/SelectInput";
import { EventType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface EventFormProps {
  types: EventType[];
}

const EventForm = ({ types }: EventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      dateTime: "",
      description: "",
      type: 1,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/events", data)
      .then((data) => console.log(data))
      .catch(() => console.log("f"))
      .finally(() => console.log("finally!"));
  };
  return (
    <div className="flex flex-col bg-white gap-2 p-6 w-96 text-black">
      <div>
        <h2 className="font-bold text-2xl">Criar evento</h2>
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Calendar mode="single" initialFocus {...register("dateTime")} />

        <Input
          type="text"
          id="description"
          label="Descrição"
          placeholder="Descrição"
          register={register}
        />
        <SelectInput
          id="type"
          options={types}
          label="Tipos"
          register={register}
        />
        <Button type="submit" variant="default">
          Criar
        </Button>
      </form>
    </div>
  );
};

export default EventForm;
