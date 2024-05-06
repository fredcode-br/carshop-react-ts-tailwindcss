import { useEffect } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

const Location = () => {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.src = `https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_DA_API_AQUI&libraries=places`;
    mapScript.async = true;
    document.head.appendChild(mapScript);

    mapScript.onload = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.5505, lng: -46.6333 },
        zoom: 15,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: -23.5505, lng: -46.6333 },
        map: map,
        title: 'Localização da Empresa',
      });
    };
  }, []);

  return (
    <div className="container mx-auto pt-8 pb-14 px-4 md:px-8 lg:px-16 xl:px-32">
      <h2 className="text-center font-bold font-poppins text-4xl pb-4">Localização</h2>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex flex-col w-full md:w-2/5 p-4 text-center bg-black text-white rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Horários de Funcionamento</h2>
          <p>Segunda: 9:00 - 18:00</p>
          <p>Terça: 9:00 - 18:00</p>
          <p>Quarta: 9:00 - 18:00</p>
          <p>Quinta: 9:00 - 18:00</p>
          <p>Sexta: 9:00 - 18:00</p>
          <p>Sábado: 10:00 - 14:00</p>
          <p>Domingo: Fechado</p>
          <div className='flex justify-start mt-6'>
            <MapPinIcon height={28}/>
            <p>Av. Maj. Fernando Valle, 2013 - São Miguel, Bragança Paulista - SP, 12903-000</p>
          </div>
        </div>
        <div className="w-full md:w-3/5 rounded-lg" id="map" style={{ height: '400px' }}></div>
      </div>
    </div>
  );
};

export default Location;
