import { useEffect, useState } from "react";
import PanelSearchBar from "../../../components/PanelSearchBar";
import { useApi } from "../../../hooks/useApi";
import CategoryList from "./CategoryList";
import CategoryModal from "./CategoryModal";
import ICategory from "../../../types/ICategory";
import Button from "../../../components/Button";

function Categories() {
    const [vehiclesTypes, setVehiclesTypes] = useState<ICategory[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { get } = useApi();


    useEffect(() => {
        const getVehiclesTypes = async () => {
            if (!vehiclesTypes) {
                try {
                    const resp = await get("categories/");
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
        const resp = await get("categories/");
        setVehiclesTypes(resp);
    }


    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="h-full flex flex-col">
            <h1 className="text-3xl font-semibold text-gray-600">Categorias</h1>
            <form action="">
                <PanelSearchBar placeholder="Nome..." />
                <div className="flex justify-between"></div>
            </form>
            <Button
                customClass="mt-5 w-44"
                handleClick={handleNew}
            >
                Novo
            </Button>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSaveSuccess={handleSaveSuccess}
            />

            <CategoryList 
                vehiclesTypes={vehiclesTypes} 
                handleNewButton={handleNew} 
                onSave={handleSaveSuccess} 
            />

        </div>
    )
}

export default Categories;