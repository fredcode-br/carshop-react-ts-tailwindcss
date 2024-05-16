import { ChangeEvent } from 'react';

interface Props {
  id: string;
  label: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: {id: string, name: string}[] | null;
}

const CustomSelect = ({ id, label, value, onChange, options }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1">{label}:</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Selecione uma Opção</option>
        {options && (
          options.map((option, i) => (
            <option key={i} value={option.id}>{option.name}</option>
          ))
        )}
      </select>
    </div>
  );
};

export default CustomSelect;
