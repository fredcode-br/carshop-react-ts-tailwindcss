import { Link } from 'react-router-dom';

interface Props {
    to: string;
    text: string;
    customClass?: string;
}

function LinkButton({ to, text, customClass }: Props) {
    return (
        <Link 
            className={`bg-dark-100 text-white text-center font-bold border-0 py-2 w-full rounded-md hover:opacity-85 ${customClass}`} 
            to={to}
        >
            {text}
        </Link>
    );
}

export default LinkButton;

