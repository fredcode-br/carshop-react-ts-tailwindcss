import React, { useState, useEffect } from "react";
// import IImage from "./IImage";
// import IVehicle from "./IVehicle";

interface Props {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
}

function VehicleModal({ id, isOpen, onClose, onSaveSuccess }: Props) {
    // const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    const [name, setName] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    // const [year, setYear] = useState<number>(0);
    // const [km, setKm] = useState<number>(0);
    // const [engine, setEngine] = useState<string>('');
    // const [color, setColor] = useState<string>('');
    // const [plate, setPlate] = useState<string>('');
    // const [gearbox, setGearbox] = useState<string>('');
    // const [fuel, setFuel] = useState<string>('');
    // const [doorsNumber, setDoorsNumber] = useState<number>(0);
    // const [optionals, setOptionals] = useState<string>('');
    // const [comments, setComments] = useState<string>('');
    // const [status, setStatus] = useState<string>('');
    // const [views, setViews] = useState<number>(0);
    // const [images, setImages] = useState<IImage[]>([]);

    useEffect(() => {
    }, [id]);

    const handleSave = async () => {
        onSaveSuccess();
        onClose();
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 p-5">
                    <div className="bg-white p-6 rounded-lg" style={{minWidth: '500px'}}>
                        <span className="absolute top-0 right-0 cursor-pointer" onClick={handleClose}>&times;</span>
                        <h2 className="text-xl font-semibold mb-4">{id ? "Atualizar" : "Cadastrar "} Veículo</h2>
                        <div className="mb-4">
                            <label htmlFor="vehicleName" id="vehicleName" className="block mb-1">Nome:</label>
                            <input
                                type="text"
                                name="vehicleName"
                                id="vehicleName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vehicleModel" id="vehicleModel" className="block mb-1">Modelo:</label>
                            <input
                                type="text"
                                name="vehicleModel"
                                id="vehicleModel"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vehiclePrice" id="vehiclePrice" className="block mb-1">Preço:</label>
                            <input
                                type="number"
                                name="vehiclePrice"
                                id="vehiclePrice"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        {/* Adicione mais campos de entrada conforme necessário para todas as propriedades do veículo */}
                    </div>
                    <div className="flex justify-between">
                        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Fechar</button>
                        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Salvar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default VehicleModal;
