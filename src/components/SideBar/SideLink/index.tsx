import { Link } from "react-router-dom";
import { HomeIcon, TruckIcon,WalletIcon } from "@heroicons/react/24/outline";

interface Props {
    text: string;
    to: string;
    iconName: string;
    activeLink: string;
    setActiveLink: (to:string) => void;
}

function SideLink({text, to, iconName, activeLink, setActiveLink}: Props) {
    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case "home":
                return <HomeIcon className="h-6 w-6 mr-3" />;
            case "truck":
                return <TruckIcon className="h-6 w-6 mr-3" />;
            case "wallet":
                    return <WalletIcon className="h-6 w-6 mr-3" />;
            default:
                return null;
        }
    };

    const handleClick = () => {
        setActiveLink(to); // Atualiza o link ativo ao clicar no SideLink
      };

    return(
          <Link
          className={`flex items-center py-2 px-4 hover:text-orange-600 cursor-pointer ${to === activeLink ? 'text-orange-600' : 'text-white'}`}
          to={`/${to}`}
          onClick={handleClick}
        >
          {renderIcon(iconName)}
          {text}
        </Link>
    )
}

export default SideLink;