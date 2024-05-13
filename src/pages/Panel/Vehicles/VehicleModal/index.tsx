import { useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import CustomInput from "./CustomInput";
import IVehicle from "../../../../types/IVehicle";
import { useApi } from "../../../../hooks/useApi";
import IVehicleType from "../../../../types/IVehicleType";
import ICategory from "../../../../types/ICategory";

interface Props {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
}

function VehicleModal({ id, isOpen, onClose, onSaveSuccess }: Props) {
    const [step, setStep] = useState(1);
    const [images, setImages] = useState<File[]>([]);
    const token = sessionStorage.getItem("@App:token") || "";
    const [vehicle, setVehicle] = useState<IVehicle>({
        id: '',
        name: '',
        created_at: '',
        model: '',
        price: 0,
        year: 0,
        km: 0,
        engine: '',
        color: '',
        plate: '',
        gearbox: '',
        fuel: '',
        doorsNumber: 0,
        optionals: '',
        comments: '',
        status: '',
        views: 0,
        images: [],
        vehicleTypeId: '',
        categoryId: '',
        manufacturerId: '',
    });
    const [vehicleTypeId, setVehicleTypeId] = useState<string>('');
    const [vehiclesTypes, setVehiclesTypes] = useState<IVehicleType[] | null>(null);

    const [categoryId, setCategoryId] = useState<string>('');
    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const { get } = useApi();

    useEffect(() => {
        const getVehicle = async () => {
            if (id && id !== vehicle?.id) {
                const currentVehicle = await get(`vehicles/${id}`);
                if (currentVehicle) {
                    await setVehicle(currentVehicle);
                }
            }
        }

        getVehicle();
    }, [id, get, vehicle]);

    
    useEffect(() => {
        const getVehiclesTypes = async () => {
            if (!vehiclesTypes) {
                const resp: IVehicleType[] = await get('vehicle-types');
                if (resp) {
                    await setVehiclesTypes(resp);
                }
            }
        }
        getVehiclesTypes();
    }, [get, vehiclesTypes]);

    useEffect(() => {
        const getCategories = async () => {
            if (!categories) {
                const resp: ICategory[] = await get(`categories/${id}`);
                if (resp) {
                    await setCategories(resp);
                }
            }
        }
        getCategories();
    }, [get, categories, id]);

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

    // const onDrop = (acceptedFiles: File[]) => {
    //     const newImages = [...images, ...acceptedFiles];
    //     setImages(newImages.slice(0, 6)); // Limite de 6 imagens
    // };

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
                                        value={vehicle.name}
                                        onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })}
                                        type="text"
                                    />
                                    <CustomInput
                                        id="vehicleModel"
                                        label="Modelo"
                                        value={vehicle.model}
                                        onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                                        type="text"
                                    />
                                    <CustomInput
                                        id="vehiclePrice"
                                        label="Preço"
                                        value={vehicle.price}
                                        onChange={(e) => setVehicle({ ...vehicle, price: Number(e.target.value) })}
                                        type="number"
                                    />
                                    <CustomInput
                                        id="vehicleYear"
                                        label="Ano"
                                        value={vehicle.year}
                                        onChange={(e) => setVehicle({ ...vehicle, year: Number(e.target.value) })}
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
                                        value={vehicle.color}
                                        onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })}
                                        type="text"
                                    />
                                    <CustomInput
                                        id="vehicleDoors"
                                        label="Número de Portas"
                                        value={vehicle.doorsNumber}
                                        onChange={(e) => setVehicle({ ...vehicle, doorsNumber: Number(e.target.value) })}
                                        type="number"
                                    />
                                    <CustomInput
                                        id="vehicleKm"
                                        label="Km"
                                        value={vehicle.km}
                                        onChange={(e) => setVehicle({ ...vehicle, km: Number(e.target.value) })}
                                        type="number"
                                    />
                                    <CustomInput
                                        id="vehiclePlate"
                                        label="Placa"
                                        value={vehicle.plate}
                                        onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })}
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
                                    value={vehicle.engine}
                                    onChange={(e) => setVehicle({ ...vehicle, engine: e.target.value })}
                                    type="text"
                                />
                                <CustomInput
                                    id="vehicleGearbox"
                                    label="Câmbio"
                                    value={vehicle.gearbox}
                                    onChange={(e) => setVehicle({ ...vehicle, gearbox: e.target.value })}
                                    type="text"
                                />
                                <CustomInput
                                    id="vehicleFuel"
                                    label="Combustível"
                                    value={vehicle.fuel}
                                    onChange={(e) => setVehicle({ ...vehicle, fuel: e.target.value })}
                                    type="text"
                                />
                                <select
                                    id="vehicleStatus"
                                    value={vehicle.status}
                                    onChange={(e) => setVehicle({ ...vehicle, status: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="Disponível">Disponível</option>
                                    <option value="Desativado">Desativado</option>
                                    <option value="Vendido">Vendido</option>
                                </select>
                                <select
                                    id="vehicleTypeId"
                                    value={vehicleTypeId}
                                    onChange={(e) => setVehicleTypeId(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="">Selecione um Opção</option>
                                    {vehiclesTypes && (vehiclesTypes.map((val,i)=>
                                    (<option key={i} value={val.id}>{val.name}</option>)
                                    ))} 
                                
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
                                        value={vehicle.optionals}
                                        onChange={(e) => setVehicle({ ...vehicle, optionals: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="vehicleComments" id="vehicleComments" className="block mb-1">Comentários:</label>
                                    <textarea
                                        name="vehicleComments"
                                        id="vehicleComments"
                                        value={vehicle.comments}
                                        onChange={(e) => setVehicle({ ...vehicle, comments: e.target.value })}
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
