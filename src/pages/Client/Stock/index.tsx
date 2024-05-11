import { useEffect, useState } from 'react';
import VehicleCard from '../../../components/VehicleCard';
import IVehicle from '../../../types/IVehicle';
import { useApi } from '../../../hooks/useApi';
import Select from '../../../components/Form/Select';
import IManufacturer from '../../../types/IManufacturer';
import ICategory from '../../../types/ICategory';


interface Pagination {
    currentPage: number;
    itemsPerPage: number;
}

function Stock() {
    const [vehicles, setVehicles] = useState<Partial<IVehicle[]> | null>(null);
    const [manufacturers, setManufacturers] = useState<Partial<IManufacturer[]> | null>(null);
    const [categories, setCategories] = useState<Partial<ICategory[]> | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        itemsPerPage: 8,
    });
    const { get } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!manufacturers) {
                    const manufacturersResponse = await get('manufacturers');
                    if (manufacturersResponse) {
                        setManufacturers(manufacturersResponse);
                    }
                }
                if (!categories) {
                    const categoriesResponse = await get('categories');
                    if (categoriesResponse) {
                        setCategories(categoriesResponse);
                    }
                }
                if (!vehicles) {
                    const vehiclesResponse = await get('vehicles');
                    if (vehiclesResponse) {
                        setVehicles(vehiclesResponse);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [get, manufacturers, categories, vehicles]);

    const applyFilters = () => {
        // Implement filter logic
    };

    const handlePageChange = (page: number): void => {
        setPagination({ ...pagination, currentPage: page });
    };

    const filteredVehiclesBySearch = vehicles?.filter(vehicle =>
        vehicle?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    const paginatedCars = filteredVehiclesBySearch?.slice(startIndex, endIndex);

    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 1999 }, (_, i) => String(currentYear - i));

    return (
        <div className="container mx-auto pt-8 pb-14 px-4 md:px-8 lg:px-16 xl:px-26">
            <h2 className="text-center font-bold font-poppins text-4xl pb-4">Estoque</h2>

            <div id="filter" className="flex flex-col gap-8 md:flex-row justify-between items-center p-4 mb-4 bg-dark-100 rounded-md">
                <div className='w-full md:w-auto flex flex-col md:flex-row gap-8'>
                    <Select
                        id="manufacturer"
                        label="Fabricante"
                        options={(manufacturers || []).map(manufacturer => ({ id: manufacturer?.id || '', name: manufacturer?.name || '' }))}
                        onChange={(e) => console.log(e.target.value)}
                        customClass="mb-0"
                    />
                    <Select
                        id="category"
                        label="Categoria"
                        options={(categories || []).map(category => ({ id: category?.id || '', name: category?.name || '' }))}
                        onChange={(e) => console.log(e.target.value)}
                        customClass="mb-0"
                    />
                    <Select
                        id="year"
                        label="Ano"
                        options={yearsArray.map(year => ({ id: year, name: year }))}
                        onChange={(e) => console.log(e.target.value)}
                        customClass="mb-0"
                    />
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row justify-between gap-2">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded-md mb-2 md:mb-0"
                    />
                    <button onClick={applyFilters} className="bg-white text-black opacity-85 hover:opacity-75 p-2 rounded-md">Aplicar Filtros</button>
                </div>
            </div>

            <div id="stock" className="mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {paginatedCars !== undefined ? (
                    paginatedCars.map((vehicle) => (
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
