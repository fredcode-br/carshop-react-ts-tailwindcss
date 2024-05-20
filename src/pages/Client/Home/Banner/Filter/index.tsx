import { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import RangeSlider from "../../../../../components/Form/RangeSlider";
import Select from "../../../../../components/Form/Select";
import { useApi } from "../../../../../hooks/useApi";
import IManufacturer from "../../../../../types/IManufacturer";
import ICategory from "../../../../../types/ICategory";
import IVehicle from "../../../../../types/IVehicle";
import { IResponse } from "../../../../../types/IRespoonse";
import { useNavigate } from "react-router-dom";

function Filter() {
    const [manufacturers, setManufacturers] = useState<Partial<IManufacturer[]> | null>(null);
    const [categories, setCategories] = useState<Partial<ICategory[]> | null>(null);
    const [vehicles, setVehicles] = useState<Partial<IVehicle[]> | null>(null)

    const [year, setYear] = useState<number | null>(null);
    const [manufacturerId, setManufacturerId] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);

    const navigate = useNavigate();

    const { get } = useApi();

    const handleMinPriceChange = (value: number) => {
        setMinPrice(value);
    };

    const handleMaxPriceChange = (value: number) => {
        setMaxPrice(value);
    };

    useEffect(() => {
        const getManufacturers = async () => {
            try {
                if (!manufacturers) {
                    const response = await get('manufacturers');
                    if (response) {
                        setManufacturers(response);
                    }
                }
            } catch (error) {
                console.error('Erro ao obter fabricantes:', error);
            }
        };

        getManufacturers();
    }, [get, manufacturers]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                if (!categories) {
                    const response = await get('categories');
                    if (response) {
                        setCategories(response);
                    }
                }
            } catch (error) {
                console.error('Erro ao obter categorias:', error);
            }
        };

        getCategories();
    }, [get, categories]);

    useEffect(() => {
        const getVehicles = async () => {
            try {
                if (!vehicles) {
                    const resp: IResponse | null = await get('vehicles?limit=4');
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

    const highestPriceVehicle = vehicles?.slice().sort((a, b) => (b?.price || 0) - (a?.price || 0))[0];
    const lowestPriceVehicle = vehicles?.slice().sort((a, b) => (a?.price || 0) - (b?.price || 0))[0];

    const lowestYearVehicle = vehicles?.slice().sort((a, b) => (a?.year || 0) - (b?.year || 0))[0]?.year;
    const currentYear = new Date().getFullYear();

    const yearsArray = [];
    if (lowestYearVehicle) {
        for (let year = lowestYearVehicle; year <= currentYear; year++) {
            yearsArray.push(String(year));
        }
    }

    useEffect(() => {
      const syncPriceValues = async () => {
        await setMinPrice(Number(lowestPriceVehicle?.price) || 0);
        await setMaxPrice(Number(highestPriceVehicle?.price) || 100);
      }

        if (lowestPriceVehicle && highestPriceVehicle) {
            syncPriceValues();
        }

        
    }, [lowestPriceVehicle, highestPriceVehicle]);

    const handleSearch = () => {
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
      if (minPrice) {
          query += `minPrice=${minPrice}&`;
      }
      if (maxPrice) {
          query += `maxPrice=${maxPrice}&`;
      }

      query = query.slice(0, -1);
  
      const url = `/estoque?${query}&page=1&limit=10`;  
      
      navigate(url);
  };

    return (
        <div className="hidden lg:block bg-white bg-opacity-75 p-4 rounded-md shadow-md">
            <h2 className="text-xl text-center font-bold mb-4">Encontre seu próximo veículo:</h2>

            <Select
                id="manufacturer"
                label="Fabricante"
                options={(manufacturers || []).map(manufacturer => ({ id: manufacturer?.id || '', name: manufacturer?.name || '' }))}
                onChange={(e) => setManufacturerId(e.target.value)}
            />

            <Select
                id="category"
                label="Categoria"
                options={(categories || []).map(category => ({ id: category?.id || '', name: category?.name || '' }))}
                onChange={(e) => setCategoryId(e.target.value)}
            />

            <Select
                id="year"
                label="Ano"
                options={(yearsArray || []).map(year => ({ id: year || '', name: year || '' }))}
                onChange={(e) => setYear(Number(e.target.value))}
            />
            <RangeSlider
                highest={highestPriceVehicle?.price || 0} 
                lowest={lowestPriceVehicle?.price || 3000}
                onLeftValueChange={(value) => handleMinPriceChange(Math.round(value))}
                onRightValueChange={(value) => handleMaxPriceChange(Math.round(value))}
            />
            <div className="w-full flex">
                <Button type="submit" customClass="min-w-full" handleClick={handleSearch}>
                    Pesquisar
                </Button>
            </div>
        </div>
    );
}

export default Filter;
