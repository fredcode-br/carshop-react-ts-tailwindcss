import SideLink from "./SideLink";

import logo from "../../assets/img/logoadm.png";
import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../common/context/AuthContext";
function SideBar() {
  const [activeLink, setActiveLink] = useState(""); 
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);
  useEffect(() => {
    const url: string = window.location.pathname;
    const valorAposBarra: string = url.split("/")[1];
    setActiveLink(valorAposBarra);
  }, []);

  const handleSetActiveLink = (to: string) => {
    setActiveLink(to);
  };

  return (
    <div className="flex-shrink-0 w-64 bg-dark-100 p-4">
      <div className="flex items-center justify-center h-16 text-white">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="flex-1 mt-5 px-2">
         <SideLink
          text="Tipos de Veículos"
          to="tipos-de-veiculos"
          iconName="retangle"
          activeLink={activeLink}
          setActiveLink={handleSetActiveLink}
        />
         <SideLink 
          text="Categorias"
          to="categorias"
          iconName="wallet"
          activeLink={activeLink}
          setActiveLink={handleSetActiveLink}
        />
         <SideLink 
          text="Fabricantes"
          to="fabricantes"
          iconName="wrench"
          activeLink={activeLink}
          setActiveLink={handleSetActiveLink}
        />
        <SideLink 
          text="Veículos"
          to="veiculos"
          iconName="truck"
          activeLink={activeLink}
          setActiveLink={handleSetActiveLink}
        />
       {/* <Button handleClick={()=>{signOut(); navigate('/home')}}> Sair</Button> */}
      </nav>
    </div>
  );
}

export default SideBar;
