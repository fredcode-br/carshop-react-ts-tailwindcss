import { useEffect, useState } from 'react';
import VehicleCard from '../../../components/VehicleCard';
import IVehicle from '../../../types/IVehicle';
import { useApi } from '../../../hooks/useApi';


interface Pagination {
    currentPage: number;
    itemsPerPage: number;
}

function Stock() {
  const [vehicles, setVehicles] = useState<Partial<IVehicle[]> | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    itemsPerPage: 8,
  });
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

    const applyFilters = () => {
    
    };

    const handlePageChange = (page: number): void => {
        setPagination({ ...pagination, currentPage: page });
    };

    const filteredVehiclesBySearch = vehicles?.filter((vehicle) =>
        vehicle?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    const paginatedCars = filteredVehiclesBySearch?.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto pt-8 pb-14 px-4 md:px-8 lg:px-16 xl:px-26">
            <h2 className="text-center font-bold font-poppins text-4xl pb-4">Estoque</h2>

            <div id="filter" className="flex justify-between items-center p-4 mb-4 bg-dark-100 rounded-md">

                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-md w-full md:w-1/2"
                />
                <button onClick={applyFilters} className="bg-black text-white p-2 rounded-md">Aplicar Filtros</button>
            </div>

            {/* Estoque */}
            <div id="stock" className="mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedCars !== undefined ? (
                    paginatedCars.slice(0, 8).map((vehicle) => (
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
            
            <div className="flex justify-center mt-4">
                {filteredVehiclesBySearch !== undefined && (Array.from({ length: Math.ceil(filteredVehiclesBySearch.length / pagination.itemsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-2 p-2 rounded-md ${index + 1 === pagination.currentPage ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                )))}
            </div>
        </div>
    );
}

export default Stock;
