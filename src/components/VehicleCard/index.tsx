import LinkButton from "../LinkButton";

interface Props {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  year: number;
  km: number;
}

function VehicleCard({ id, imageUrl, title, price, km, year }: Props ) {
  return (
    <article className=" max-w-72 rounded overflow-hidden p-3 cursor-pointer border border-solid border-black border-opacity-25 bg-white shadow-md hover:opacity-95 ">
        <div className="w-full relative ">
          <img className="w-full" src={`http://localhost:3000${imageUrl}`} alt={title} />
          <span className="w-1/2 bg-dark-100 text-ligth-100 text-center text-sm font-semibold py-2 absolute bottom-0 left-0 border-e border-gray-500">{km}KM</span>
          <span className="w-1/2 bg-dark-100 text-ligth-100 text-center text-sm font-semibold py-2 absolute bottom-0 right-0">{year}</span>
        </div>
        <p className="font-bold text-center text-xl my-5 px-">{title}</p>
        <LinkButton
          text={`R$${price.toString()}`}
          to={`/veiculos/${id}`}
          customClass=""
        />

    </article>
  );
}

export default VehicleCard;
