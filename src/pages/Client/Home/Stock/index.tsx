import { useEffect, useState } from "react";
import { useApi } from "../../../../hooks/useApi";
import IVehicle from "../../../../types/IVehicle";
import VehicleCard from "../../../../components/VehicleCard";
import LinkButton from "../../../../components/LinkButton";
import { IResponse } from "../../../../types/IRespoonse";

function Stock() {
    const [vehicles, setVehicles] = useState<Partial<IVehicle[]> | null>(null);
    const { get } = useApi();

    useEffect(() => {
        const getVehicles = async () => {
            try {
                if (!vehicles) {
                    const resp: IResponse | null = await get('vehicles?limit=8');
                    if (resp) {
                        setVehicles(resp.vehicles)
                    }
                }
            } catch (error) {
                console.error('Erro ao obter veículos:', error);
            }
        };

        getVehicles();
    }, [get, vehicles]);

    return (
        <section id="stock" className="flex flex-col items-center pb-16">
            <h3 className="pb-5 text-center text-xl font-bold uppercase">Procurar por modelo</h3>
            <div className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicles !== null ? (
                    vehicles.map((vehicle) => (
                        vehicle && (
                            <VehicleCard
                                key={vehicle.id}
                                id={vehicle.id}
                                title={vehicle.name}
                                imageUrl={vehicle.images && vehicle.images[0] ? vehicle.images[0].imageUrl : ''} // Verifica se 'vehicle.images' e 'vehicle.images[0]' existem antes de acessar 'imageUrl'
                                price={vehicle.price}
                                km={vehicle.km}
                                year={vehicle.year}
                            />
                        )
                    ))
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
            <div>
                <LinkButton
                    text="Ver estoque"
                    to="/estoque"
                    customClass="px-5 py-3"
                />
            </div>
        </section>
    )
}

export default Stock;