interface Props {
    optionals: string;
}

function Optionals({ optionals }: Props) {

    return (
        <section id="optionals" className="flex flex-col items-center py-4">
            <div className="container">

            <h3 className="text-left text-2xl font-semibold">Opicionais</h3>
            <div className="flex flex-col md:flex-row items-start min-h-48 p-4 mt-2 bg-white">
                <p>{optionals || "Sem informações"}</p>
            </div>
            </div>
        </section>
    );
}

export default Optionals;
