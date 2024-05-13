import { useEffect, useState } from "react";
import Button from "../../../components/Button";
// import PanelSearchBar from "../../../components/PanelSearchBar";
import IManufacturer from "../../../types/IManufacturer";
import { useApi } from "../../../hooks/useApi";
import ManufacturerModal from "./ManufactureModal";
import ManufacturerList from "./ManufactureList";

function Manufacturers() {
    const [manufacturers, setManufacturers] = useState<IManufacturer[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { get } = useApi();

    useEffect(() => {
        const getManufacturers = async () => {
            try {
                const resp = await get("manufacturers/");
                setManufacturers(resp);
            } catch (error) {
                console.error('Erro ao obter fabricantes:', error);
            }
        }

        if (!manufacturers) {
            getManufacturers();
        }
    }, [get, manufacturers]);

    const handleNew = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    const handleSaveSuccess = async () => {
        try {
            const resp = await get("manufacturers/");
            setManufacturers(resp);
        } catch (error) {
            console.error('Erro ao obter fabricantes:', error);
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }


    return(
        <div className="h-full flex flex-col">
            <h1 className="text-3xl font-semibold text-gray-600">Fabricantes</h1>
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

            <ManufacturerModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSaveSuccess={handleSaveSuccess}
            />

            <ManufacturerList 
                manufacturers={manufacturers} 
                handleNewButton={handleNew} 
                onSave={handleSaveSuccess} 
            /> 

        </div>
    )
}

export default Manufacturers;
