import { useEffect, useState } from "react";
import IVehicle from "../../../../types/IVehicle";

interface Props {
    vehicle: IVehicle | null;
}

function TopData({vehicle}: Props) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (vehicle !== null && vehicle.images && vehicle.images.length > 0) {
            setSelectedImage(vehicle.images[0].imageUrl);
        }
    }, [vehicle]);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    return (
        <section id="vehicle" className="flex flex-col md:flex-row items-center py-8">
            <div className="md:w-1/2">
                {selectedImage && (
                    <img src={`http://localhost:3000${selectedImage}`} alt={vehicle?.name || "Vehicle"} className="w-full" />
                )}
                <div className="flex justify-center mt-4">
                    {vehicle?.images?.map((image) => (
                        <img
                            key={image.id}
                            src={`http://localhost:3000${image.imageUrl}`}
                            alt={`Vehicle ${image.id + 1}`}
                            className="w-16 h-16 mx-2 cursor-pointer"
                            onClick={() => handleImageClick(image.imageUrl)}
                        />
                    ))}
                </div>
            </div>
            <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-2">{vehicle?.name}</h1>
                <p className="text-xl mb-4">{vehicle?.model}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                        <p>Ano: {vehicle?.year}</p>
                        <p>Câmbio: {vehicle?.gearbox}</p>
                    </div>
                    <div>
                        <p>Km: {vehicle?.km}</p>
                    </div>
                </div>
                <p className="text-xl font-medium mb-2">Valor: {vehicle?.price}</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Falar com o vendedor
                </button>
            </div>
        </section>
    );
}

export default TopData;
