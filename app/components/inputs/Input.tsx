import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  id: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  register: UseFormRegister<FieldValues>;
}

const Input = ({
  type,
  label,
  id,
  placeholder,
  register,
  required,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-black" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        {...register(id, { required })}
        className="border"
      />
    </div>
  );
};

export default Input;
