import { useEffect, useState } from "react";
import Card_selector_category from "../../components/material_components/Card_selector_category";
import firebaseApp from "../../firebase/credenciales";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import Search_input from '../../components/generalComponents/Search_Input';
import Form_new_category from "../../components/material_components/modal_newCategory/Form_new_category"

export default function Material_category_page() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); // Estado para manejar la búsqueda
    const [stateModal, setStateModal] = useState(false);
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "categorias"));
                const lista = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCategorias(lista);
            } catch (error) {
                console.error("Error obteniendo materiales:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMateriales();
    }, []);

    const searcher = (e) => {
        setSearch(e.target.value);
    };

    // Filtrar categorías por el nombre basado en la búsqueda
    const filteredCategories = !search
        ? categorias
        : categorias.filter((categoria) =>
            categoria.nombre.toLowerCase().includes(search.toLowerCase())
        );

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <div className="animate-spin rounded-full h-[15vw] w-[15vw] border-t-[20px] border-[#F6BF41]"></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-4 relative px-2 md:px-2 lg:px-0 min-h-[100vh]">
                <section className='flex flex-row gap-3 items-center'>
                    <div className="w-[50%] place-content-center">
                        <Search_input function_search={searcher} />
                    </div>
                    <div className="w-[50%] flex flex-col md:flex-row lg:flex-row justify-around gap-2">
                        <button
                            onClick={() => setStateModal(true)}
                            className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg md:w-[40%] lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'>
                            Agregar
                        </button>
                    </div>
                </section>

                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-y-10 px-2'>
                    {filteredCategories.map((categoria) => (
                        <Card_selector_category key={categoria.id} tittle={categoria.nombre} />
                    ))}
                </section>
            </div>
            <Form_new_category state={stateModal} setState={setStateModal} setCategorias={setCategorias} />
        </>
    );
}
