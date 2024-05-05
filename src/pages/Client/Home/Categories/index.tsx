import { useEffect, useState } from "react";
import LinkButton from "../../../../components/LinkButton";
import { useApi } from "../../../../hooks/useApi";
import ICategory from "../../../../types/ICategory";


function Categories() {
    const [categories, setCategories] = useState<Partial<ICategory[]> | null>(null)
    const { get } = useApi();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await get('categories');
                if (response) {
                    setCategories(response);
                }
            } catch (error) {
                console.error('Erro ao obter categorias:', error);
            }
        };

        getCategories();
    }, [get]);

    return (
        <section id="categories" className="flex flex-col items-center py-8">
            <div className="container">
                <h3 className="pb-5 text-center text-xl font-bold uppercase">Procurar por categoria</h3>
                <ul className="w-full flex flex-wrap justify-center md:justify-between gap-2">
                    {categories !== null ? (
                        categories.slice(0, 4).map((category) => (
                            category && (
                                <LinkButton
                                    key={category.id}
                                    text={category.name}
                                    to=""
                                    customClass="md:w-1/6"
                                />
                            )
                        ))
                    ) : (
                        <p>Carregando...</p>
                    )}
                    <LinkButton
                        text="Outros"
                        to=""
                        customClass="md:w-1/6"
                    />
                </ul>
            </div>
        </section>

    )
}

export default Categories;
