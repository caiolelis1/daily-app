import { FieldValues, UseFormRegister } from "react-hook-form";

interface Option {
  id: string;
  name: string;
}

interface SelectInputProps {
  id: string;
  options: Option[];
  label?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
}

const SelectInput = ({
  id,
  options,
  label,
  placeholder,
  register,
}: SelectInputProps) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={label}>{label}</label>}
      <select id={id} {...register(id)}>
        {placeholder && (
          <option disabled selected>
            {placeholder}
          </option>
        )}
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
