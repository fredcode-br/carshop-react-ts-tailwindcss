import { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import RangeSlider from "../../../../../components/Form/RangeSlider";
import Select from "../../../../../components/Form/Select";
import { useApi } from "../../../../../hooks/useApi";
import IManufacturer from "../../../../../types/IManufacturer";
import ICategory from "../../../../../types/ICategory";
import IVehicle from "../../../../../types/IVehicle";

function Filter() {
  const [manufacturers, setManufacturers] = useState<Partial<IManufacturer[]> | null>(null);
  const [categories, setCategories] = useState<Partial<ICategory[]> | null>(null);
  const [vehicles, setVehicles] = useState<Partial<IVehicle[]> | null>(null)

  const { get } = useApi();

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
          const response = await get('vehicles');
          if (response) {
            setVehicles(response);
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

  return (
    <div className="hidden lg:block bg-white bg-opacity-75 p-4 rounded-md shadow-md">
      <h2 className="text-xl text-center font-bold mb-4">Encontre seu próximo veículo:</h2>

      <Select
        id="manufacturer"
        label="Fabricante"
        options={(manufacturers || []).map(manufacturer => ({ id: manufacturer?.id || '', name: manufacturer?.name || '' }))}
        onChange={(e) => console.log(e.target.value)}
      />

      <Select
        id="category"
        label="Categoria"
        options={(categories || []).map(category => ({ id: category?.id || '', name: category?.name || '' }))}
        onChange={(e) => console.log(e.target.value)}
      />

      <Select
        id="year"
        label="Ano"
        options={(yearsArray || []).map(year => ({ id: year || '', name: year || '' }))}
        onChange={(e) => console.log(e.target.value)}
      />

      <RangeSlider highest={highestPriceVehicle?.price || 0} lowest={lowestPriceVehicle?.price || 100000} />
      <div className="w-full flex">

        <Button type="submit" customClass="min-w-full">
          Pesquisar
        </Button>
      </div>
    </div>
  );
}

export default Filter;
