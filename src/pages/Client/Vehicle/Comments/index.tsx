interface Props {
    comments: string;
}

function Comments({ comments }: Props) {

    return (
        <section id="comments" className="flex flex-col items-center pt-5 pb-20">
            <div className="container">

            <h3 className="text-left text-2xl font-semibold">Observações</h3>
            <div className="flex flex-col md:flex-row items-start min-h-48 p-4 mt-2 bg-white">
                <p>{comments || "Sem informações"}</p>
            </div>
            </div>
        </section>
    );
}

export default Comments;
