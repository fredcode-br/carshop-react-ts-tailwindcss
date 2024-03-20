interface Props {
    id: string;
    options: { id: string; name: string }[];
    customClass?: string;
}

function Select({ id, options, customClass }: Props) {
    return (
        <select id={id} className={`block w-full py-2 px-32 border border-gray-300 rounded-md mb-4 ${customClass}`}>
            {options.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
    );
}

export default Select;
