import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../common/context/AuthContext";



const PrivateRoute = () => {
    const { signed } = useContext(AuthContext);

    return (
        <Outlet />
        // signed ? <Outlet /> : <Navigate to="/login" /> 
    )
}

export default PrivateRoute;