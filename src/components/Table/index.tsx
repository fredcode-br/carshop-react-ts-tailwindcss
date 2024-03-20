import { ReactNode } from "react";

interface Props {
    children: ReactNode;
  }
  
function Table({ children } : Props) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            {children}
        </table>
    )
}

export default Table;