import { useEffect, useState } from "react";
import PanelSearchBar from "../../../components/PanelSearchBar";
import Button from "../../../components/Button";
import VehicleTypeModal from "./VehicleTypeModal";
import VehicleTypeList from "./VehicleTypeList";
import IVehicleType from "../../../types/IVehicleType";
import { useApi } from "../../../hooks/useApi";

function VehicleType() {
    const [vehiclesTypes, setVehiclesTypes] = useState<IVehicleType[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { get } = useApi();


    useEffect(() => {
        const getVehiclesTypes = async () => {
            if (!vehiclesTypes) {
                try {
                    const resp = await get("vehicle-types/");
                    setVehiclesTypes(resp);
                } catch (error) {
                    console.error('Erro ao obter tipos de veículos:', error);
                }
            }
        }

        getVehiclesTypes();
    }, [get, vehiclesTypes]);



    const handleNew = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    const handleSaveSuccess = async () => {
        const resp = await get("vehicle-types/");
        setVehiclesTypes(resp);
    }


    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="h-full flex flex-col">
            <h1 className="text-3xl font-semibold text-gray-600">Tipos de Veículos</h1>
            <form action="">
                <PanelSearchBar placeholder="Nome, Marca, Ano, ..." />
                <div className="flex justify-between"></div>
            </form>
            <Button
                customClass="mt-5 w-44"
                handleClick={handleNew}
            >
                Novo
            </Button>

            <VehicleTypeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSaveSuccess={handleSaveSuccess}
            />

            <VehicleTypeList 
                vehiclesTypes={vehiclesTypes} 
                handleNewButton={handleNew} 
                onSave={handleSaveSuccess} 
            />

        </div>
    )
}

export default VehicleType;