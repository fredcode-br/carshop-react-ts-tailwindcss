import { useEffect, useState } from "react";
import { useDropzone, Accept } from 'react-dropzone';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useApi } from "../../../../hooks/useApi";
import ICategory from "../../../../types/ICategory";
import IManufacturer from "../../../../types/IManufacturer";
import IVehicle from "../../../../types/IVehicle";
import IVehicleType from "../../../../types/IVehicleType";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

interface Props {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
}

function VehicleModal({ id, isOpen, onClose, onSaveSuccess }: Props) {
    const [step, setStep] = useState(1);
    const token = sessionStorage.getItem("@App:token") || "";
    const vehicleBase = {
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
        vehicleType: null,
        category: null,
        manufacturer: null,
    }
    const [vehicle, setVehicle] = useState<IVehicle>(vehicleBase);
    const [vehiclesTypes, setVehiclesTypes] = useState<IVehicleType[] | null>(null);
    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const [manufacturers, setManufacturers] = useState<IManufacturer[] | null>(null);

    const [vehicleTypeId, setVehicleTypeId] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>('');
    const [manufacturerId, setManufacturerId] = useState<string>('');

    const [imageUrls, setImageUrls] = useState<Array<string>>([]);
    const [images, setImages] = useState<File[]>([]);

    const { get, post, put } = useApi();

    useEffect(() => {
        const getVehicle = async () => {
            if (id && id !== vehicle?.id) {
                const currentVehicle: IVehicle = await get(`vehicles/${id}`);
                if (currentVehicle) {
                    await setVehicle(currentVehicle);
                    if (currentVehicle.vehicleType) {
                        await setVehicleTypeId(currentVehicle.vehicleType?.id)
                    }
                    if (currentVehicle.manufacturer) {
                        await setManufacturerId(currentVehicle.manufacturer?.id)
                    }
                    if (currentVehicle.category) {
                        await setCategoryId(currentVehicle.category?.id)
                    }
                    if (currentVehicle.images) {
                        const urls: string[] = []
                        currentVehicle.images.map((url) => {
                            urls.push(url.imageUrl)
                        })
                        setImageUrls(urls)
                    }
                }
            }
        };

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
        const getManufacturers = async () => {
            if (!manufacturers) {
                const resp: IManufacturer[] = await get('manufacturers');
                if (resp) {
                    await setManufacturers(resp);
                }
            }
        }
        getManufacturers();
    }, [get, manufacturers]);


    useEffect(() => {
        const getCategories = async () => {
            if (!categories && vehicleTypeId !== "") {
                const resp: ICategory[] = await get(`/vehicle-types/${vehicleTypeId}/categories/`);
                if (resp) {
                    await setCategories(resp);
                }
            }
        }
        getCategories();
    }, [get, categories, vehicleTypeId, id]);

    useEffect(() => {
        const getCategoriesByType = async () => {
            if (vehicleTypeId !== "") {
                const resp: ICategory[] = await get(`/vehicle-types/${vehicleTypeId}/categories/`);
                if (resp) {
                    setCategories(resp);
                }
            }
        };

        getCategoriesByType();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleTypeId]);


    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSave = async () => {
        const removedImageUrls: string[] = [];
        
        const currentVehicle = {
            ...vehicle,
            manufacturerId: Number(manufacturerId),
            categoryId: Number(categoryId),
            vehicleTypeId: Number(vehicleTypeId)
        };

        currentVehicle.images.forEach((image) => {
            if (!imageUrls.find(url => url === image.imageUrl)) {
                removedImageUrls.push(image.imageUrl);
            }
        });
        

        const formData = new FormData();
       
        if(images.length > 0){
            await images.forEach((file) => {
                formData.append(`files`, file);
            });
        }
        if (id === undefined) {
            const newVehicle: IVehicle = await post(`vehicles/`, currentVehicle, token);
            if(formData){
                await post(`/vehicles/${newVehicle.id}/images`, formData, token,{
                    "Content-Type": "multipart/form-data"
                });            
            }   
        }else {
            // await put(`vehicles/${id}`, currentVehicle, token);
            if (removedImageUrls.length > 0 || formData) {
               
                removedImageUrls.forEach(url => {
                    formData.append('removedImageUrls', url);
                });
                await put(`vehicles/${id}/images`, formData, token,{
                    "Content-Type": "multipart/form-data"
                });          
            }
        }
    
        setVehicle(vehicleBase);
        onSaveSuccess();
        handleClose();
    };
    

    const handleClose = () => {
        setImages([])
        onClose();
    };

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const newImages = [...images, ...acceptedFiles].slice(0, 6);
            setImages(newImages);
        }
    };

    const handleRemoveImage = (index: number) => {
        if (index < imageUrls.length) {
            const newImageUrls = [...imageUrls];
            newImageUrls.splice(index, 1);
            setImageUrls(newImageUrls);
        } else {
            const newImages = [...images];
            newImages.splice(index - imageUrls.length, 1);
            setImages(newImages);
        }
    };
    
    const accept: Accept = {
        'image/*': []
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
        multiple: true,
    });

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
                                    <div className="w-full flex justify-between">
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
                                    <CustomSelect
                                        id="manufacturerId"
                                        label="Fabricante"
                                        value={manufacturerId}
                                        onChange={(e) => setManufacturerId(e.target.value)}
                                        options={manufacturers}
                                    />
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Detalhes Adicionais</h2>
                                    <div className="w-full flex justify-between">
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
                                    </div>
                                    <div className="w-full flex justify-between">
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
                                    <CustomSelect
                                        id="vehicleTypeId"
                                        label="Tipo de Veículo"
                                        value={vehicleTypeId}
                                        onChange={(e) => setVehicleTypeId(e.target.value)}
                                        options={vehiclesTypes}
                                    />
                                    <CustomSelect
                                        id="categoryId"
                                        label="Categoria"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        options={categories}
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
                                <CustomSelect
                                    id="vehicleStatus"
                                    label="Status"
                                    value={vehicle.status}
                                    onChange={(e) => setVehicle({ ...vehicle, status: e.target.value })}
                                    options={[
                                        { id: "Disponível", name: "Disponível" },
                                        { id: "Desativado", name: "Desativado" },
                                        { id: "Vendido", name: "Vendido" },
                                    ]}
                                />
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

                                <div className="mb-4">
                            <label htmlFor="manufacturerImage" className="block mb-1">Imagem:</label>
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} id="manufacturerImage" name="manufacturerImage" />
                                <div className="flex flex-wrap">
                                    {imageUrls.map((imageUrl, index) => (
                                        <div key={index} className="relative h-20 w-20 m-1">
                                            <img src={`http://localhost:3000${imageUrl}`} alt={`Imagem ${index}`} className="h-20 w-20 mb-2 object-cover" />
                                            <button className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={() => handleRemoveImage(index)}>
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {images.map((image, index) => (
                                        <div key={image.name + index} className="relative h-20 w-20 m-1">
                                            <img src={URL.createObjectURL(image)} alt={`Imagem ${index}`} className="h-20 w-20 mb-2 object-cover" />
                                            <button className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={() => handleRemoveImage(imageUrls.length + index)}>
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {(images.length + imageUrls.length) < 6 && (
                                        <div className="flex justify-center items-center w-20 h-20 cursor-pointer border-gray-400 rounded-md border-2 m-1">
                                            <PlusIcon className="h-8 w-8 text-gray-500" />
                                        </div>
                                    )}
                                </div>
                                {(images.length + imageUrls.length) === 0 && (
                                    <span className="text-sm text-gray-500 mt-2">
                                        Arraste e solte uma imagem aqui, ou clique para selecionar uma imagem
                                    </span>
                                )}
                            </div>
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
