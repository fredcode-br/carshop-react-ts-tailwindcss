import { NavLink } from 'react-router-dom';

import logo from "../../assets/img/logo.png"

function Footer() {
  return (
    <footer className="bg-dark-100">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="logo" />
          </a>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">

            <NavLink to="/" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400">
              Home
            </NavLink>

            <NavLink to="/estoque" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400 ">
              Estoque
            </NavLink>

            <NavLink to="/vender" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400 ">
              Vender
            </NavLink>

            <NavLink to="/localizacao" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400">
              Localização
            </NavLink>

            <NavLink to="/contato" className="block py-2 px-3 text-white md:p-0 hover:text-slate-400">
              Contato
            </NavLink>

          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">CarShop</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
