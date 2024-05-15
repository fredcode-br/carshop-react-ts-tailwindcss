import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import IVehicle from "../../../types/IVehicle";
import { useParams } from "react-router-dom";
import TopData from "./TopData";
import Optionals from "./Optionals";
import Comments from "./Comments";

function Vehicle() {
    const { id } = useParams<string>();
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const { get, post } = useApi();

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
                    console.error('Erro ao obter veículo:', error);
                }
            };
            const incrementView = async () => {
                try {
                    await post(`vehicles/${id}/increment`);
                } catch (error) {
                    console.error('Erro ao adicionar visualização ao veículo:', error);
                }
            };

            getVehicle();
            incrementView();
        }
    }, [get, post, id, currentId]);

    return (
        <>
            <TopData vehicle={vehicle} />
            <Optionals optionals={vehicle?.optionals || ""} />
            <Comments comments={vehicle?.comments || ""}/>
        </>
    );
}

export default Vehicle;
