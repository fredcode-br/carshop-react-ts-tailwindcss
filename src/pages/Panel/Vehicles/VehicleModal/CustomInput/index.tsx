import { ChangeEvent } from 'react';

interface Props {
  id: string;
  label: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'number';
}

const CustomInput = ({ id, label, value, onChange, type }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1">{label}:</label>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
  );
};

export default CustomInput;
