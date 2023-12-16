"use client";

import Button from "@/app/components/buttons/Button";
import DateInput from "@/app/components/inputs/DateInput";
import Input from "@/app/components/inputs/Input";
import SelectInput from "@/app/components/inputs/SelectInput";

const EventForm = () => {
  return (
    <div className="flex flex-col bg-white gap-2 p-6 w-96 text-black">
      <div>
        <h2 className="font-bold text-2xl">Criar evento</h2>
      </div>
      <div className="flex flex-col gap-2">
        <DateInput />
        <Input
          type="text"
          name="description"
          label="Descrição"
          placeholder="Descrição"
        />
        <SelectInput name="type" options={[]} label="Tipos" />
        <Button />
      </div>
    </div>
  );
};

export default EventForm;
