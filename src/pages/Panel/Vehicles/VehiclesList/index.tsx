import { useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import Table from "../../../../components/Table";
import TableHeader from "../../../../components/Table/TableHeader";
import TableHead from "../../../../components/Table/TableHead";
import TableBody from "../../../../components/Table/TableBody";
import TableRow from "../../../../components/Table/TableRow";
import TableCell from "../../../../components/Table/TableCell";
import Button from "../../../../components/Button";
import defaultVehicle from "../../../../assets/img/defaultcar.jpg"
import IVehicle from "../../../../types/IVehicle";
import ConfirmAction from '../../../../components/ConfirmAction';
import VehicleModal from '../VehicleModal';

interface Props {
    handleNewButton: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onSave: () => void;
    vehicles: IVehicle[] | null;
}

function VehicleList({ handleNewButton, onSave, vehicles }: Props) {
    const [isModalVehicleOpen, setIsModalVehicleOpen] = useState(false);
    const [isModaConfirmActionlOpen, setIsModaConfirmActionlOpen] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>(undefined);
    const { del } = useApi();

    const handleDelete = (id: string) => {
        setSelectedVehicleId(id);
        setIsModaConfirmActionlOpen(true);
    }

    const handleEdit = (id: string) => {
        setSelectedVehicleId(id);
        setIsModalVehicleOpen(true);
    }

    const handleSaveSuccess = async () => {
        onSave()
    }


    const handleCloseModalVehicle = async () => {
        setIsModalVehicleOpen(false);
        setSelectedVehicleId(undefined);
    }

    const handleConfirm = async () => {
        setIsModaConfirmActionlOpen(false);
        await del(`vehicles/${selectedVehicleId}`, sessionStorage.getItem("@App:token") || "");
        onSave();
        setSelectedVehicleId(undefined);
    };

    const handleCloseModalConfirmAction = async () => {
        setIsModaConfirmActionlOpen(false);
        setSelectedVehicleId(undefined);
    };

    return (
        <section className="bg-white w-full mt-8 p-5 pt-1 rounded-md flex-grow">
            <ConfirmAction
                isOpen={isModaConfirmActionlOpen}
                onClose={handleCloseModalConfirmAction}
                onConfirm={handleConfirm}
                message="Tem certeza de que deseja executar esta ação?"
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader customClass="w-1/12">Id</TableHeader>
                        <TableHeader customClass="w-2/12">Imagem</TableHeader>
                        <TableHeader customClass="w-6/12">Nome</TableHeader>
                        <TableHeader customClass="w-3/12">Preço</TableHeader>
                        <TableHeader customClass="w-full text-center">Ação</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(vehicles) &&
                        vehicles.map(vehicle => (
                            <TableRow key={vehicle.id}>
                                <TableCell>{vehicle.id}</TableCell>
                                <TableCell>
                                    {vehicle.images && vehicle.images.length > 0 ? (
                                        <img
                                            className="h-12 w-16"
                                            src={`http://localhost:3000${vehicle.images[0].imageUrl}`}
                                            alt={`imagem do veículo`}
                                        />
                                    ) : (
                                        <img
                                            className="h-12 w-16"
                                            src={defaultVehicle}
                                            alt={`imagem padrão veículo`}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{vehicle.name}</TableCell>
                                <TableCell>R${vehicle.price},00</TableCell>
                                <TableCell customClass="flex justify-center ">
                                    <Button customClass="bg-transparent m-0 py-2 px-2" handleClick={() => handleDelete(vehicle.id)}>
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:opacity-75" />
                                    </Button>
                                    <Button customClass="bg-transparent py-2 px-2" handleClick={() => handleEdit(vehicle.id)}>
                                        <PencilIcon className="h-5 w-5 text-blue-600 hover:opacity-75" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
            {!vehicles && (
                <div className="h-full flex flex-col justify-center items-center text-center">
                    <h2 className="text-center text-2xl font-semibold text-gray-600">Você ainda não tem nenhum veículo,<br /> cadastre um novo aqui!</h2>
                    <Button customClass="w-40 mt-6" handleClick={handleNewButton}>
                        Novo
                    </Button>
                </div>
            )}

            <VehicleModal
                isOpen={isModalVehicleOpen}
                onClose={handleCloseModalVehicle}
                id={selectedVehicleId}
                onSaveSuccess={handleSaveSuccess}
            />

        </section>
    )
}

export default VehicleList;