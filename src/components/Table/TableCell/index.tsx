import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  customClass?: string;
}

function TableCell({ children, customClass } : Props) {
  return (
    <td className={`text-xs font-medium px-6 py-2 whitespace-nowrap ${customClass}`}>
      {children}
    </td>
  );
}

export default TableCell;
