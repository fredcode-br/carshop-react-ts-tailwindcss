import { useState, useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi';
import ICategory from '../../../../types/ICategory';
import IVehicleType from '../../../../types/IVehicleType';

interface Props {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
}

function CategoryModal({ id, isOpen, onClose, onSaveSuccess }: Props) {
    const [vehicleType, setVehicleType] = useState<ICategory | null>(null);
    const [name, setName] = useState('');
    const [vehicleTypeId, setVehicleTypeId] = useState<string>('');
    const [vehicleTypes, setVehicleTypes] = useState<IVehicleType[]>([]);
    const [token, setToken] = useState('');
    const { get, post, put } = useApi();

    useEffect(() => {
        const token = sessionStorage.getItem("@App:token") || "";
        setToken(token);

        const getVehicleTypes = async () => {
            
                const currentVehicleType = await get(`/vehicle-types`);
                if (currentVehicleType) {
                setVehicleTypes(currentVehicleType);
                }
            
        }

        const getCurrentVehicleType = async () => {
            if (id && id !== vehicleType?.id) {
                const currentVehicleType = await get(`categories/${id}`);
                if (currentVehicleType) {
                   
                    setName(currentVehicleType[0].name);
                    setVehicleTypeId(currentVehicleType[0].vehicleType.id);
                }
            }
        }
        getVehicleTypes();
        getCurrentVehicleType();
    }, [id]);

    const handleSave = async () => {
      
        if (id === undefined) {
            await post(`vehicle-types/${vehicleTypeId}/categories`, { name :name }, token); 
            setName('');
        } else {
            await put(`categories/${id}`, { name: name, vehicleTypeId: parseInt(vehicleTypeId) }, token); 
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
                        <h2 className="text-xl font-semibold mb-4">{id ? "Atualizar" : "Cadastrar "} Categoria</h2>
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
                        <div className="mb-4">
                                <label htmlFor="vehicleTypeId" className="block mb-1">Tipo de Veículo:</label>
                                <select
                                    id="vehicleTypeId"
                                    value={vehicleTypeId}
                                    onChange={(e) => setVehicleTypeId(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="">Selecione um Opção</option>
                                    {vehicleTypes && (vehicleTypes.map((val,i)=>
                                    (<option key={i} value={val.id}>{val.name}</option>)
                                    ))} 
                                
                                </select>
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

export default CategoryModal;
