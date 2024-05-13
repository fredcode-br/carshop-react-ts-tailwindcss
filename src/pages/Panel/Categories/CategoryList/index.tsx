import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import Table from '../../../../components/Table';
import TableRow from '../../../../components/Table/TableRow';
import TableCell from '../../../../components/Table/TableCell';
import TableHeader from '../../../../components/Table/TableHeader';
import TableHead from '../../../../components/Table/TableHead';
import TableBody from '../../../../components/Table/TableBody';
import Button from '../../../../components/Button';

import { useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import ConfirmAction from '../../../../components/ConfirmAction';
import CategoryModal from '../CategoryModal';
import ICategory from '../../../../types/ICategory';

interface Props {
    handleNewButton: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onSave: () => void;
    categories: ICategory[] | null;
}

function CategoryList({ handleNewButton, onSave, categories }: Props) {
    const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
    const [isModaConfirmActionlOpen, setIsModaConfirmActionlOpen] = useState(false);
    const [selecteCategoryId, setSelecteCategoryId] = useState<string | undefined>(undefined);
    const { del } = useApi();

    const handleDelete = (id: string) => {
        setSelecteCategoryId(id);
        setIsModaConfirmActionlOpen(true);
    }

    const handleEdit = (id: string) => {
        setSelecteCategoryId(id);
        setIsModalCategoryOpen(true);
    }

    const handleSaveSuccess = async () => {
        onSave()
    }


    const handleCloseModalCategory = async () => {
        setIsModalCategoryOpen(false);
        setSelecteCategoryId(undefined);
    }

    const handleConfirm = async () => {
        setIsModaConfirmActionlOpen(false);
        const token = await sessionStorage.getItem("@App:token");
        await del(`categories/${selecteCategoryId}`, token || "");
        onSave();
        setSelecteCategoryId(undefined);
      };
    
      const handleCloseModalConfirmAction= async () => {
        setIsModaConfirmActionlOpen(false);
        setSelecteCategoryId(undefined);
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
                        <TableHeader customClass="w-1/5">Id</TableHeader>
                        <TableHeader customClass="w-2/5">Nome</TableHeader>
                        <TableHeader customClass="w-2/5">Tipo de Veículo</TableHeader>
                        <TableHeader customClass="w-1/5 text-center">Ação</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(categories) ?
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.vehicleType?.name || "-"}</TableCell>
                                <TableCell customClass="items-center">
                                    <Button customClass="bg-transparent m-0 py-2 px-2" handleClick={() => handleDelete(category.id)}>
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:opacity-75" />
                                    </Button>
                                    <Button customClass="bg-transparent py-2 px-2" handleClick={() => handleEdit(category.id)}>
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
            {!categories && (
                <div className="h-full flex flex-col justify-center items-center text-center">
                    <h2 className="text-center text-2xl font-semibold text-gray-600">Você ainda não tem nenhum tipo de veículo,<br /> cadastre um novo aqui!</h2>
                    <Button customClass="w-40 mt-6" handleClick={handleNewButton}>
                        Novo
                    </Button>
                </div>
            )}

            <CategoryModal
                isOpen={isModalCategoryOpen}
                onClose={handleCloseModalCategory}
                id={selecteCategoryId}
                onSaveSuccess={handleSaveSuccess}
            />
        </section>
    );
}

export default CategoryList;
