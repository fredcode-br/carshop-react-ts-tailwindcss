import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  customClass?: string;
}

function TableHeader({ children, customClass } : Props) {
  return (
    <th scope="col" className={`px-6 py-3 text-left text-xs font-bold text-gray-400 tracking-wider ${customClass}`}>
      {children}
    </th>
  );
}

export default TableHeader;
