import { useEffect, useState, useRef } from "react";
import IVehicle from "../../../../types/IVehicle";
import whatsapp from "../../../../assets/ico/whatsapp.svg";

interface Props {
    vehicle: IVehicle | null;
}

function TopData({ vehicle }: Props) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const thumbnailContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        if (vehicle !== null && vehicle.images && vehicle.images.length > 0) {
            setSelectedImage(vehicle.images[0].imageUrl);
        }
    }, [vehicle]);

    useEffect(() => {
        const container = thumbnailContainerRef.current;
        if (container) {
            setShowScrollButton(container.scrollWidth > container.clientWidth);
        }
    }, [vehicle]);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const scrollThumbnailsRight = () => {
        if (thumbnailContainerRef.current) {
            thumbnailContainerRef.current.scrollBy({
                left: 100,
                behavior: "smooth",
            });
        }
    };

    return (
        <section id="top-data" className="flex flex-col md:flex-row items-center justify-center py-20">
            <div className="container flex flex-col md:flex-row items-stretch gap-10">
                <div className="md:w-1/2 flex flex-col relative">
                    <div className="flex-grow">
                        {selectedImage && (
                            <img
                                src={`http://localhost:3000${selectedImage}`}
                                alt={vehicle?.name || "Vehicle"}
                                className="main-image"
                                style={{ width: "530px", height: "360px" }}
                            />
                        )}
                    </div>
                    <div className="flex mt-2 gap-2 overflow-x-auto" ref={thumbnailContainerRef}>
                        {vehicle?.images?.map((image) => (
                            <img
                                key={image.id}
                                src={`http://localhost:3000${image.imageUrl}`}
                                alt={`Vehicle ${image.id + 1}`}
                                className="w-16 h-16 cursor-pointer"
                                onClick={() => handleImageClick(image.imageUrl)}
                            />
                        ))}
                    </div>
                    {showScrollButton && (
                        <button className="scroll-button right-0 absolute top-1/2 transform -translate-y-1/2" onClick={scrollThumbnailsRight}>
                            Avançar
                        </button>
                    )}
                </div>
                <div className="md:w-1/2 flex flex-col justify-between p-4 bg-white">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{vehicle?.name}</h1>
                        <p className="text-2xl font-semibold mb-4">{vehicle?.model}</p>
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="flex flex-col gap-3">
                                <p className="font-semibold">Ano: <span className="font-normal">{vehicle?.year}</span></p>
                                <p className="font-semibold">Câmbio: <span className="font-normal">{vehicle?.gearbox}</span></p>
                                <p className="font-semibold">Color: <span className="font-normal">{vehicle?.color}</span></p>
                                <p className="font-semibold">Combustível: <span className="font-normal">{vehicle?.fuel}</span></p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="font-semibold">Km: <span className="font-normal">{vehicle?.km}</span></p>
                                <p className="font-semibold">Motor: <span className="font-normal">{vehicle?.engine}</span></p>
                                <p className="font-semibold">Portas: <span className="font-normal">{vehicle?.gearbox}</span></p>
                            </div>
                        </div>
                    </div>
                    <p className="text-2xl font-medium mb-2">Valor: R${vehicle?.price},00</p>
                    <button className="flex justify-center items-center gap-4 bg-green-500 text-white text-xl py-3 px-4 rounded-md hover:bg-green-600">
                        <img
                            src={whatsapp}
                            alt={vehicle?.name || "Vehicle"}
                            className="w-12 h12"
                        />
                        Falar com o vendedor
                    </button>
                </div>
            </div>
        </section>
    );
}

export default TopData;
