import { useEffect, useState } from 'react';
import VehicleCard from '../../../components/VehicleCard';
import IVehicle from '../../../types/IVehicle';
import { useApi } from '../../../hooks/useApi';
import Select from '../../../components/Form/Select';
import IManufacturer from '../../../types/IManufacturer';
import ICategory from '../../../types/ICategory';
import { IResponse } from '../../../types/IRespoonse';
import { useNavigate, useLocation } from 'react-router-dom';

function Stock() {
    const [vehicles, setVehicles] = useState<Partial<IVehicle[]> | null>(null);
    const [manufacturers, setManufacturers] = useState<Partial<IManufacturer[]> | null>(null);
    const [categories, setCategories] = useState<Partial<ICategory[]> | null>(null);

    const [year, setYear] = useState<number | null>(null);
    const [manufacturerId, setManufacturerId] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');

    const navigate = useNavigate();
    const { get } = useApi();
    const location = useLocation();

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

                // Parse URL parameters and set state
                const params = new URLSearchParams(location.search);
                setYear(params.get('year') ? parseInt(params.get('year') as string, 10) : null);
                setManufacturerId(params.get('manufacturerId'));
                setCategoryId(params.get('categoryId'));
                setSearchTerm(params.get('searchTerm') || '');

                // Construct URL with query parameters and fetch vehicles
                const url = `/vehicles?${params.toString()}&limit=2`;
                const vehiclesResponse: IResponse = await get(url);
                if (vehiclesResponse) {
                    setVehicles(vehiclesResponse.vehicles);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [get, manufacturers, categories, location.search]);

    const applyFilters = () => {
        let query = "";

        if (manufacturerId) {

            query += `manufacturerId=${manufacturerId}&`;
        }
        if (categoryId) {
            query += `categoryId=${categoryId}&`;
        }
        if (year) {
            query += `year=${year}&`;
        }
        if (searchTerm) {
            query += `searchTerm=${searchTerm}&`;
        }

        query = query.slice(0, -1);

        const url = `/estoque?${query}&page=1`;
        alert(year);
        // navigate(url);
    };

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
                        onChange={(e) => setManufacturerId(e.target.value)}
                        customClass="mb-0"
                    />
                    <Select
                        id="category"
                        label="Categoria"
                        options={(categories || []).map(category => ({ id: category?.id || '', name: category?.name || '' }))}
                        onChange={(e) => setCategoryId(e.target.value)}
                        customClass="mb-0"
                    />
                    <Select
                        id="year"
                        label="Ano"
                        options={yearsArray.map(year => ({ id: year, name: year }))}
                        onChange={(e) => setYear(Number(e.target.value))}
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
                {vehicles !== null ? (
                    vehicles.map((vehicle) => (
                        vehicle && (
                            <div key={vehicle.id} className="flex justify-center">
                                <VehicleCard
                                    id={vehicle.id}
                                    title={vehicle.name}
                                    imageUrl={vehicle.images && vehicle.images[0] ? vehicle.images[0].imageUrl : ''}
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
        </div>
    );
}

export default Stock;
