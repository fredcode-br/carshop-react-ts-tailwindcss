import { useState, useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi';
import IVehicleType from '../../../../types/IVehicleType';

interface Props {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
}

function VehicleTypeModal({ id, isOpen, onClose, onSaveSuccess }: Props) {
    const [vehicleType, setVehicleType] = useState<IVehicleType | null>(null);
    const [name, setName] = useState('');
    const token = localStorage.getItem("@Auth:token") || "";
    const { get, post, put } = useApi();

    useEffect(() => {
        const getVehicleType = async () => {
            if (id && id !== vehicleType?.id) {
                const currentVehicleType = await get(`vehicle-types/${id}`);
                if (currentVehicleType) {
                    setName(currentVehicleType.name);
                    setVehicleType(currentVehicleType);
                }
            }
        }

        getVehicleType();
    }, [id, get, vehicleType]);

    const handleSave = async () => {
        if (!id) {
            await post("vehicle-types/", { name }, token); 
            setName('');
        } else {
            await put(`vehicle-types/${id}`, { name }, token); 
        }
        setVehicleType(null);
        setName('');
        onSaveSuccess();
        onClose();
    }

    const handleClose = () => {
        setVehicleType(null);
        setName('');
        onClose();
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 p-5">
                    <div className="bg-white p-6 rounded-lg">
                        <span className="absolute top-0 right-0 cursor-pointer" onClick={handleClose}>&times;</span>
                        <h2 className="text-xl font-semibold mb-4">{id ? "Atualizar" : "Cadastrar "} Tipo de Veículo</h2>
                        <div className="mb-4">
                            <label htmlFor="vehicleTypeName" className="block mb-1">Nome:</label>
                            <input
                                type="text"
                                id="vehicleTypeName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Fechar</button>
                            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default VehicleTypeModal;
