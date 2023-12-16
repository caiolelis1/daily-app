interface Option {
  id: number;
  text: string;
}

interface SelectInputProps {
  name: string;
  options: Option[];
  label?: string;
  placeholder?: string;
}

const SelectInput = ({
  name,
  options,
  label,
  placeholder,
}: SelectInputProps) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={label}>{label}</label>}
      <select name={name} id={label}>
        {placeholder && (
          <option disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
