import { useState } from "react";
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import ConfirmAction from "../../../../components/ConfirmAction";
import IManufacturer from "../../../../types/IManufacturer";
import { useApi } from "../../../../hooks/useApi";
import TableHead from "../../../../components/Table/TableHead";
import TableRow from "../../../../components/Table/TableRow";
import Table from "../../../../components/Table";
import TableHeader from "../../../../components/Table/TableHeader";
import TableBody from "../../../../components/Table/TableBody";
import TableCell from "../../../../components/Table/TableCell";
import Button from "../../../../components/Button";
import ManufacturerModal from "../ManufactureModal";

import defaultManufacturer from "../../../../assets/img/defaultmanufacturer.jpg"

interface Props {
    handleNewButton: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onSave: () => void;
    manufacturers: IManufacturer[] | null;
}

function ManufacturerList({ handleNewButton, onSave, manufacturers }: Props) {
    const [isModalManufacturerOpen, setIsModalManufacturerOpen] = useState(false);
    const [isModaConfirmActionlOpen, setIsModaConfirmActionlOpen] = useState(false);
    const [selectedManufacturerId, setSelectedManufacturerId] = useState<string | undefined>(undefined);
    const { del } = useApi();

    const handleDelete = (id: string) => {
        setSelectedManufacturerId(id);
        setIsModaConfirmActionlOpen(true);
    }

    const handleEdit = (id: string) => {
        setSelectedManufacturerId(id);
        setIsModalManufacturerOpen(true);
    }

    const handleSaveSuccess = async () => {
        onSave()
    }


    const handleCloseModalManufacturer = async () => {
        setIsModalManufacturerOpen(false);
        setSelectedManufacturerId(undefined);
    }

    const handleConfirm = async () => {
        setIsModaConfirmActionlOpen(false);
        await del(`manufacturers/${selectedManufacturerId}`, localStorage.getItem("@Auth:token") || "");
        onSave();
        setSelectedManufacturerId(undefined);
    };

    const handleCloseModalConfirmAction = async () => {
        setIsModaConfirmActionlOpen(false);
        setSelectedManufacturerId(undefined);
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
                        <TableHeader customClass="w-2/12">Logo</TableHeader> 
                        <TableHeader customClass="w-6/12">Nome</TableHeader>
                        <TableHeader customClass="w-full text-center">Ação</TableHeader> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(manufacturers) ?
                        manufacturers.map(manufacturerer => (
                            <TableRow key={manufacturerer.id}>
                                <TableCell>{manufacturerer.id}</TableCell>
                                <TableCell>
                                    {!manufacturerer.imageUrl ?
                                        <img
                                            className="h-12 w-12"
                                            src={defaultManufacturer}
                                            alt={`imagem padrão logo`}
                                        /> :
                                        <img
                                            className="h-12 w-12"
                                            src={`http://192.168.186.151:3000${manufacturerer.imageUrl}`}
                                            alt={`logo da marca ${manufacturerer.name}`}
                                        />
                                    }
                                </TableCell>
                                <TableCell>{manufacturerer.name}</TableCell>
                                <TableCell customClass="flex justify-center ">
                                    <Button customClass="bg-transparent m-0 py-2 px-2" handleClick={() => handleDelete(manufacturerer.id)}>
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:opacity-75" />
                                    </Button>
                                    <Button customClass="bg-transparent py-2 px-2" handleClick={() => handleEdit(manufacturerer.id)}>
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
            {!manufacturers && (
                <div className="h-full flex flex-col justify-center items-center text-center">
                    <h2 className="text-center text-2xl font-semibold text-gray-600">Você ainda não tem nenhum fabricante,<br /> cadastre um novo aqui!</h2>
                    <Button customClass="w-40 mt-6" handleClick={handleNewButton}>
                        Novo
                    </Button>
                </div>
            )}

            <ManufacturerModal
                isOpen={isModalManufacturerOpen}
                onClose={handleCloseModalManufacturer}
                id={selectedManufacturerId}
                onSaveSuccess={handleSaveSuccess}
            />

        </section>
    )
}

export default ManufacturerList;