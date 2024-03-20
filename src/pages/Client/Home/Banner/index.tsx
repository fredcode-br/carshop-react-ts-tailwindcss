import Filter from "./Filter";

import banner from "../../../../assets/img/banner.jpg";

function Banner() {
  return (
    <div className="relative bg-cover bg-center h-64 md:h-100 " style={{ backgroundImage: `url(${banner})` }}>
      <div className="container mx-auto flex items-center justify-around h-full">
        <Filter />
        <div className="text-white text-center lg:text-start">
          <h1 className="text-6xl md:text-7xl font-bold mb-2">CarShop</h1>
          <p className="text-lg md:text-4xl">Seu novo veículo está aqui!</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
