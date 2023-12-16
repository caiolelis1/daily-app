interface InputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
}

const Input = ({ type, label, name, placeholder }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-black" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={label}
        placeholder={placeholder}
        className="border"
      />
    </div>
  );
};

export default Input;
