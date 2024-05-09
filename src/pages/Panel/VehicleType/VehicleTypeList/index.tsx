import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import Table from '../../../../components/Table';
import TableRow from '../../../../components/Table/TableRow';
import TableCell from '../../../../components/Table/TableCell';
import TableHeader from '../../../../components/Table/TableHeader';
import TableHead from '../../../../components/Table/TableHead';
import TableBody from '../../../../components/Table/TableBody';
import Button from '../../../../components/Button';

import VehicleTypeModal from '../VehicleTypeModal';

import IVehicleType from '../../../../types/IVehicleType';
import { useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import ConfirmAction from '../../../../components/ConfirmAction';

interface Props {
    handleNewButton: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onSave: () => void;
    vehiclesTypes: IVehicleType[] | null;
}

function VehicleTypeList({ handleNewButton, onSave, vehiclesTypes }: Props) {
    const [isModalVehicleTypeOpen, setIsModalVehicleTypeOpen] = useState(false);
    const [isModaConfirmActionlOpen, setIsModaConfirmActionlOpen] = useState(false);
    const [selectedVehicleTypeId, setSelectedVehicleTypeId] = useState<string | undefined>(undefined);
    const { del } = useApi();

    const handleDelete = (id: string) => {
        setSelectedVehicleTypeId(id);
        setIsModaConfirmActionlOpen(true);
    }

    const handleEdit = (id: string) => {
        setSelectedVehicleTypeId(id);
        setIsModalVehicleTypeOpen(true);
    }

    const handleSaveSuccess = async () => {
        onSave()
    }


    const handleCloseModalVehicleType = async () => {
        setIsModalVehicleTypeOpen(false);
        setSelectedVehicleTypeId(undefined);
    }

    const handleConfirm = async () => {
        setIsModaConfirmActionlOpen(false);
        alert( localStorage.getItem("@Auth:token") );
        await del(`vehicle-types/${selectedVehicleTypeId}`, localStorage.getItem("@Auth:token") || "");
        onSave();
        setSelectedVehicleTypeId(undefined);
      };
    
      const handleCloseModalConfirmAction= async () => {
        setIsModaConfirmActionlOpen(false);
        setSelectedVehicleTypeId(undefined);
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
                        <TableHeader customClass="w-1/7">Id</TableHeader>
                        <TableHeader customClass="w-full">Nome</TableHeader>
                        <TableHeader customClass="w-2/7 text-center">Ação</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(vehiclesTypes) ?
                        vehiclesTypes.map(vehicleType => (
                            <TableRow key={vehicleType.id}>
                                <TableCell>{vehicleType.id}</TableCell>
                                <TableCell>{vehicleType.name}</TableCell>
                                <TableCell customClass="items-center">
                                    <Button customClass="bg-transparent m-0 py-2 px-2" handleClick={() => handleDelete(vehicleType.id)}>
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:opacity-75" />
                                    </Button>
                                    <Button customClass="bg-transparent py-2 px-2" handleClick={() => handleEdit(vehicleType.id)}>
                                        <PencilIcon className="h-5 w-5 text-blue-600 hover:opacity-75" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                        :
                        <></>
                    }
                </TableBody>
            </Table>
            {!vehiclesTypes && (
                <div className="h-full flex flex-col justify-center items-center text-center">
                    <h2 className="text-center text-2xl font-semibold text-gray-600">Você ainda não tem nenhum tipo de veículo,<br /> cadastre um novo aqui!</h2>
                    <Button customClass="w-40 mt-6" handleClick={handleNewButton}>
                        Novo
                    </Button>
                </div>
            )}

            <VehicleTypeModal
                isOpen={isModalVehicleTypeOpen}
                onClose={handleCloseModalVehicleType}
                id={selectedVehicleTypeId}
                onSaveSuccess={handleSaveSuccess}
            />
        </section>
    );
}

export default VehicleTypeList;
