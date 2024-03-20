import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  customClass?: string;
}

function TableBody({ children, customClass } : Props) {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${customClass}`}>
      {children}
    </tbody>
  );
}

export default TableBody;
