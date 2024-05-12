import { useState } from "react";
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import CustomInput from "./CustomInput";

interface Props {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
}

function VehicleModal({ id, isOpen, onClose, onSaveSuccess }: Props) {
    const [step, setStep] = useState(1);

    const [name, setName] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [year, setYear] = useState<number>(0);
    const [km, setKm] = useState<number>(0);
    const [engine, setEngine] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [plate, setPlate] = useState<string>('');
    const [gearbox, setGearbox] = useState<string>('');
    const [fuel, setFuel] = useState<string>('');
    const [doorsNumber, setDoorsNumber] = useState<number>(0);
    const [optionals, setOptionals] = useState<string>('');
    const [comments, setComments] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const [images, setImages] = useState<File[]>([]);


    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSave = async () => {
        onSaveSuccess();
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    const onDrop = (acceptedFiles: File[]) => {
        const newImages = [...images, ...acceptedFiles];
        setImages(newImages.slice(0, 6)); // Limite de 6 imagens
    };
    
    const handleRemoveImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };


    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 p-5">
                    <div className="bg-white p-6 rounded-lg flex flex-col justify-between" style={{ minWidth: '500px', minHeight: '500px' }}>
                        <span className="absolute top-0 right-0 cursor-pointer" onClick={handleClose}>&times;</span>
                        {step === 1 && (
                            <>
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">{id ? "Atualizar" : "Cadastrar "} Veículo - Informações Básicas</h2>
                                    <CustomInput
                                        id="vehicleName"
                                        label="Nome"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                    />
                                    <CustomInput
                                        id="vehicleModel"
                                        label="Modelo"
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        type="text"
                                    />
                                    <CustomInput
                                        id="vehiclePrice"
                                        label="Preço"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        type="number"
                                    />
                                    <CustomInput
                                        id="vehicleYear"
                                        label="Ano"
                                        value={year}
                                        onChange={(e) => setYear(Number(e.target.value))}
                                        type="number"
                                    />

                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Detalhes Adicionais</h2>
                                    <CustomInput
                                        id="vehicleColor"
                                        label="Cor"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        type="text"
                                    />
                                    <CustomInput
                                        id="vehicleDoors"
                                        label="Número de Portas"
                                        value={doorsNumber}
                                        onChange={(e) => setDoorsNumber(Number(e.target.value))}
                                        type="number"
                                    />
                                    <CustomInput
                                        id="vehicleKm"
                                        label="Km"
                                        value={km}
                                        onChange={(e) => setKm(Number(e.target.value))}
                                        type="number"
                                    />
                                    <CustomInput
                                        id="vehiclePlate"
                                        label="Placa"
                                        value={plate}
                                        onChange={(e) => setPlate(e.target.value)}
                                        type="text"
                                    />
                                </div>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Detalhes Adicionais (Continuação)</h2>
                                <CustomInput
                                    id="vehicleEngine"
                                    label="Motor"
                                    value={engine}
                                    onChange={(e) => setEngine(e.target.value)}
                                    type="text"
                                />
                                <CustomInput
                                    id="vehicleGearbox"
                                    label="Câmbio"
                                    value={gearbox}
                                    onChange={(e) => setGearbox(e.target.value)}
                                    type="text"
                                />
                                <CustomInput
                                    id="vehicleFuel"
                                    label="Combustível"
                                    value={fuel}
                                    onChange={(e) => setFuel(e.target.value)}
                                    type="text"
                                />
                                <select
                                    id="vehicleStatus"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="Disponível">Disponível</option>
                                    <option value="Desativado">Desativado</option>
                                    <option value="Vendido">Vendido</option>
                                </select>
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Opções Extras</h2>
                                <div className="mb-4">
                                    <label htmlFor="vehicleOptionals" id="vehicleOptionals" className="block mb-1">Opcionais:</label>
                                    <textarea
                                        name="vehicleOptionals"
                                        id="vehicleOptionals"
                                        value={optionals}
                                        onChange={(e) => setOptionals(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="vehicleComments" id="vehicleComments" className="block mb-1">Comentários:</label>
                                    <textarea
                                        name="vehicleComments"
                                        id="vehicleComments"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                                    />
                                </div>
                            </>
                        )}
                        {step === 5 && (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Imagens</h2>
                                <div className="flex flex-wrap gap-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} className="h-40 w-40 mb-2 object-cover" />
                                            <button onClick={() => handleRemoveImage(index)} className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {images.length < 6 && (
                                        <div className="flex justify-center items-center w-40 h-40 cursor-pointer border-gray-400 rounded-md border-2">
                                            <PlusIcon className="h-8 w-8 text-gray-500" />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}


                        <div className="flex justify-between">
                            <button onClick={handleClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Fechar</button>
                            <div className="flex gap-2">
                                {step > 1 && (
                                    <button onClick={handlePreviousStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Anterior</button>
                                )}
                                {step < 3 && (
                                    <button onClick={handleNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Próximo</button>
                                )}
                                {step === 3 && (
                                    <button onClick={handleNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Próximo</button>
                                )}
                                {step === 4 && (
                                    <button onClick={handleNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Próximo</button>
                                )}
                                {step === 5 && (
                                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Salvar</button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default VehicleModal;
