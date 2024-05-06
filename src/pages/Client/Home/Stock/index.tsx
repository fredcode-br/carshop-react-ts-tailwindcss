import { useEffect, useState } from "react";
import { useApi } from "../../../../hooks/useApi";
import IVehicle from "../../../../types/IVehicle";
import VehicleCard from "../../../../components/VehicleCard";
import LinkButton from "../../../../components/LinkButton";

function Stock() {
    const [vehicles, setVehicles] = useState<Partial<IVehicle[]> | null>(null)
    const { get } = useApi();

    useEffect(() => {
        const getVehicles = async () => {
            try {
                const response = await get('vehicles');
                if (response) {
                    setVehicles(response);
                }
            } catch (error) {
                console.error('Erro ao obter veículos:', error);
            }
        };

        getVehicles();
    }, [get]);
    return (
        <section id="stock" className="flex flex-col items-center pb-16">
            <h3 className="pb-5 text-center text-xl font-bold uppercase">Procurar por modelo</h3>
            <div className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicles !== null ? (
                    vehicles.slice(0, 8).map((vehicle) => (
                        vehicle && (
                            <div key={vehicle.id} className="flex justify-center">
                                <VehicleCard
                                    id={vehicle.id}
                                    title={vehicle.name}
                                    imageUrl={vehicle.images[0].imageUrl}
                                    price={vehicle.price}
                                    km={vehicle.km}
                                    year={vehicle.year}
                                />
                            </div>
                        )
                    ))
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
            <div>
                <LinkButton
                    text="Ver estoque"
                    to=""
                    customClass="px-5 py-3"
                />
            </div>
        </section>
    )
}

export default Stock;