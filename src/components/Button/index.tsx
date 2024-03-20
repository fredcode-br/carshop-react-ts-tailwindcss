import React from 'react';

interface Props {
    children: React.ReactNode;
    type?: "button" | "submit";
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    customClass?: string;
}

function Button({ children, type = "button", handleClick, customClass }: Props): JSX.Element {

    const click = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();

        if (handleClick) {
            handleClick(e);
        }
    }

    return (
        <button
            className={`bg-dark-100 text-white font-bold border-0 py-2 rounded-md hover:opacity-85 ${customClass}`}
            type={type}
            onClick={click}
        >
            {children}
        </button>
    );
}

export default Button;
