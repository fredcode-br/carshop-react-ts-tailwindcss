import { useEffect } from 'react';
import L from 'leaflet';
import { MapPinIcon } from '@heroicons/react/24/solid';
import 'leaflet/dist/leaflet.css';

const Location = () => {
  useEffect(() => {
    const map = L.map('map').setView([-23.5505, -46.6333], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([-23.5505, -46.6333]).addTo(map);
    marker.bindPopup('<b>Localização da Empresa</b><br>Av. Maj. Fernando Valle, 2013 - São Miguel, Bragança Paulista - SP, 12903-000.');

    return () => {
      map.remove();
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
