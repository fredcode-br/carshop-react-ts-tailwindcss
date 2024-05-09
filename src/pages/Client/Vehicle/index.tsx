import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import IVehicle from "../../../types/IVehicle";
import { useParams } from "react-router-dom";
import TopData from "./TopData";

function Vehicle() {
    const { id } = useParams<string>();
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const { get } = useApi();

    useEffect(() => {
        if (id && id !== currentId) {
            const getVehicle = async () => {
                try {
                    const response = await get(`vehicles/${id}`);
                    if (response) {
                        setVehicle(response);
                        setCurrentId(id);
                    }
                } catch (error) {
                    console.error('Erro ao obter veículos:', error);
                }
            };

            getVehicle();
        }
    }, [get, id, currentId]);

    return (
        <>
            <TopData vehicle={vehicle} />
        </>
    );
}

export default Vehicle;
