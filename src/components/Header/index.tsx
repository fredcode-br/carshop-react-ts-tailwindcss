import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from "../../assets/img/logo.png"

function Header(){
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  return (
    <header className="bg-dark-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="logo" />
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isNavbarOpen}
          onClick={toggleNavbar}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isNavbarOpen ? 'block' : 'hidden'}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            <li>
              <NavLink to="/" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/estoque" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400 ">
                Estoque
              </NavLink>
            </li>
            <li>
              <NavLink to="/vender" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400 ">
                Vender
              </NavLink>
            </li>
            <li>
              <NavLink to="localizacao" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400">
                Localização
              </NavLink>
            </li>
            <li>
              <NavLink to="/contato" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400">
                Contato
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
