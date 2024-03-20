import { ReactNode } from "react";

interface Props {
    children: ReactNode;
  }
  
function TableRow({ children } : Props) {
    return (
        <tr className="bg-white">
            {children}
        </tr>
    )
}

export default TableRow;