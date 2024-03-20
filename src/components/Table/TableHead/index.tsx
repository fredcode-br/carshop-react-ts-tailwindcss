import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  customClass?: string;
}

function TableHead({ children, customClass } : Props) {
  return (
    <thead className={` ${customClass}`}>
      {children}
    </thead>
  );
}

export default TableHead;
