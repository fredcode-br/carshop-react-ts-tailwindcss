import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import BasePage from "./pages/Client/BasePage";
import Home from "./pages/Client/Home";
import Stock from "./pages/Client/Stock";
import Vehicle from "./pages/Client/Vehicle";
import Contact from "./pages/Client/Contact";
import Location from "./pages/Client/Location";

import PrivateRoute from "./utils/PrivateRoute";
import AdminBasePage from "./pages/Panel/AdminBasePage";
import Manufacturers from "./pages/Panel/Manufacturers";
import VehicleType from "./pages/Panel/VehicleType";
import Categories from "./pages/Panel/Categories";
import Vehicles from "./pages/Panel/Vehicles";
import Login from "./pages/Panel/Login";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BasePage />}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/estoque" element={<Stock />} />
                    <Route path="/veiculo/:id" element={<Vehicle />} />
                    <Route path="/localizacao" element={<Location />} />       
                    <Route path="/contato" element={<Contact />} />  
                </Route>   
                <Route path="/" element={<PrivateRoute />}>
                    <Route element={<AdminBasePage />}>
                        <Route path="/home" element={<Navigate to="/login" />} />
                        <Route path="/fabricantes" element={<Manufacturers />} />
                        <Route path="/tipos-de-veiculos" element={<VehicleType />} />
                        <Route path="/categorias" element={<Categories />} />
                        <Route path="/veiculos" element={<Vehicles/>} />
                    </Route>
                </Route>       
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
