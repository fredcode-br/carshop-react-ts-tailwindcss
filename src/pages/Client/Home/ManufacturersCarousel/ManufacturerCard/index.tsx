interface Props {
    name: string;
    image: string;
}

function ManufacturerCard({ name, image }: Props) {
    return (
        <article className="flex justify-center mx-2 border border-gray-600" >
            <img src={`http://localhost:3000${image}`} alt={name} />
        </article>
    )
}

export default ManufacturerCard;

