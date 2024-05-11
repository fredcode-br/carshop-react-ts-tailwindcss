import { useEffect, useState } from "react";
import IManufacturer from "../../../../types/IManufacturer";
import { useApi } from "../../../../hooks/useApi";
import { useDropzone } from "react-dropzone";
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

interface Props {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
}

function ManufacturerModal({ id, isOpen, onClose, onSaveSuccess }: Props) {
    const [manufacturer, setManufacturer] = useState<IManufacturer | null>(null);
    const [name, setName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [image, setImage] = useState<File | undefined>(undefined);

    const token = sessionStorage.getItem("@App:token") || "";
    const { get, post, put } = useApi();

    useEffect(() => {
        const getManufacturer = async () => {
            if (id && id !== manufacturer?.id) {
                const currentManufacturer = await get(`manufacturers/${id}`);
                if (currentManufacturer) {
                    setName(currentManufacturer.name);
                    setImageUrl(currentManufacturer.imageUrl);
                    setManufacturer(currentManufacturer);
                }
            }
        }

        getManufacturer();
    }, [id, get, manufacturer]);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", name);
        if (image) {
            formData.append("file", image);
        }
        if (!id) {
            await post("manufacturers/", formData, token, { 
                "Content-Type": "multipart/form-data"
            });
                
        } else {
            await put(`manufacturers/${id}`, formData, token, {
                "Content-Type": "multipart/form-data"
            });
        }

        setName('');
        setImageUrl('');
        setImage(undefined);
        onSaveSuccess();
        onClose();
    }

    const handleClose = () => {
        setManufacturer(null);
        setName('');
        setImageUrl('');
        setImage(undefined);
        onClose();
    }

    const handleRemoveImage = () => {
        setImageUrl('');
        setImage(undefined);
    }

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            
            reader.onload = () => {
               reader.result as string;
    
            };

            reader.readAsDataURL(file);
            setImage(file);
        }
    }



    const { getRootProps, getInputProps } = useDropzone({
        onDrop
    });

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 p-5">

                    <div className="bg-white p-6 rounded-lg"  style={{minWidth: '500px'}}>
                        <span className="absolute top-0 right-0 cursor-pointer" onClick={handleClose}>&times;</span>
                        <h2 className="text-xl font-semibold mb-4">{id ? "Atualizar" : "Cadastrar "} Fabricante</h2>
                        <div className="mb-4">
                            <label htmlFor="manufacturerName"  id="manufacturerName" className="block mb-1">Nome:</label>
                            <input
                                type="text"
                                name="manufacturerName"
                                id="manufacturerName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="manufacturerImage" id="manufacturerImage" className="block mb-1">Imagem:</label>
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} id="manufacturerImage" name="manufacturerImage"/>
                                {imageUrl || image ?
                                    <>
                                        {image !== undefined ?
                                                <div className = "relative h-20 w-20">
                                                    < img src={URL.createObjectURL(image)} alt="Manufacturer Image" className="h-20 w-20 mb-2 object-cover" />
                                                    <button className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={handleRemoveImage}>
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                        :
                                            <div className="relative h-20 w-20">
                                                <img src={`http://localhost:3000${imageUrl}`} alt="Manufacturer Image" className="h-20 w-20 mb-2 object-cover" />
                                                <button className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={handleRemoveImage}>
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        }
                                    </>
                            :
                            <>
                                <div className="flex justify-center items-center w-14 h-14 cursor-pointer border-gray-400 rounded-md border-2 ">
                                    <PlusIcon className="h-8 w-8 text-gray-500" />
                                </div>
                                <span className="text-sm text-gray-500 mt-2">
                                    Arraste e solte uma imagem aqui, ou clique para selecionar uma imagem
                                </span>
                            </>
}


                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Fechar</button>
                        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Salvar</button>
                    </div>
                </div>
    </div >
)
}

        </>
    )
}

export default ManufacturerModal;
