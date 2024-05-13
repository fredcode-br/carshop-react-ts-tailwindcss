import { useEffect, useState } from "react";
import Button from "../../../components/Button";
// import PanelSearchBar from "../../../components/PanelSearchBar";
import { useApi } from "../../../hooks/useApi";
import VehiclesList from "./VehiclesList";
import IVehicle from "../../../types/IVehicle";
import { IResponse } from "../../../types/IRespoonse";
import VehicleModal from "./VehicleModal";

function Vehicles() {
    const [vehicles, setVehicles] = useState<IVehicle[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { get } = useApi();

    useEffect(() => {
        const getVehicles = async () => {
            try {
                const resp: IResponse = await get("vehicles/");
                setVehicles(resp.vehicles);
            } catch (error) {
                console.error('Erro ao obter veículos:', error);
            }
        }

        if (!vehicles) {
            getVehicles();
        }
    }, [get, vehicles]);

    const handleNew = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    const handleSaveSuccess = async () => {
        try {
            const resp: IResponse = await get("manufacturers/");
            setVehicles(resp.vehicles);
        } catch (error) {
            console.error('Erro ao obter veículos:', error);
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }


    return(
        <div className="h-full flex flex-col">
            <h1 className="text-3xl font-semibold text-gray-600">Veículos</h1>
            {/* <form action="">
                <PanelSearchBar placeholder="Nome, Marca, Ano, ..." />
                <div className="flex justify-between"></div>
            </form> */}
            <Button
                customClass="mt-5 w-44"
                handleClick={handleNew}
            >
                Novo
            </Button>

            <VehicleModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSaveSuccess={handleSaveSuccess}
            />

            <VehiclesList 
                vehicles={vehicles} 
                handleNewButton={handleNew} 
                onSave={handleSaveSuccess} 
            /> 

        </div>
    )
}

export default Vehicles;
