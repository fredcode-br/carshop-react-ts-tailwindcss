import { ChangeEvent } from "react";

interface Option {
  id: string;
  name: string;
}

interface Props {
  customClass?: string;
  options: Option[];
  id: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ customClass, options, id, label, onChange }: Props) => {
  return (
    <div className="">
      <select
        id={id}
        name={id}
        className={`block py-2 px-4 border border-gray-300 rounded-md mb-4 w-full ${customClass}`}
        onChange={onChange}
      >
        <option value="">{label}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
