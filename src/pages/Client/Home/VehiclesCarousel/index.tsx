import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import VehicleCard from '../../../../components/VehicleCard';
import IVehicle from '../../../../types/IVehicle';
import { useEffect, useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { IResponse } from '../../../../types/IRespoonse';

function VehiclesCarousel() {
  const [vehicles, setVehicles] = useState<IVehicle[] | null>(null)

  const { get } = useApi();

  useEffect(() => {
    const getVehicles = async () => {
      try {
        if (!vehicles) {
          const resp: IResponse | null = await get('vehicles?sortBy=views&limit=4');
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

  const responsiveSettings = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerMode: true,

      },
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: responsiveSettings,
    initialSlide: 0,
  };

  return (
    <section id="favorites" className="flex flex-col items-center py-8">
      <div className="container">
        <h3 className="pb-5 text-center text-xl font-bold uppercase">Os Favoritos do Momento</h3>
        <Slider {...settings} className="w-full">
          {vehicles !== null ? (
            vehicles.map((vehicle) => (
              vehicle && (
                <VehicleCard
                  key={vehicle.id}
                  id={Number(vehicle.id)}
                  title={vehicle.name}
                  imageUrl={vehicle.images && vehicle.images[0] ? vehicle.images[0].imageUrl : ''}
                  price={vehicle.price}
                  km={vehicle.km}
                  year={vehicle.year}
                />
              )
            ))
          ) : (
            <p>Carregando...</p>
          )}

        </Slider>
      </div>
    </section>
  );
}

export default VehiclesCarousel;
