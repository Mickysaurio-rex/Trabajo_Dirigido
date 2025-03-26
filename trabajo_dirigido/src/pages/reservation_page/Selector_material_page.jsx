import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useReserva } from '../../context/ReservaContext';
import firebaseApp from "../../firebase/credenciales";
import { getDocs, collection, getFirestore, where, query, doc, deleteDoc } from "firebase/firestore";
import Card_selector_reserv from '../../components/reserv_components/selector_components/Card_selector_reserv';
import Search_input from "../../components/generalComponents/Search_Input";

export default function Selector_material_page() {
    const [materials, setMaterials] = useState([]);
    const [search, setSearch] = useState("");
    const firestore = getFirestore(firebaseApp);
    const navigate = useNavigate();
    const { reserva, setReserva } = useReserva

    const searcher = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const queryMateriales = await getDocs(query(collection(firestore, "materiales")));
                const elements = queryMateriales.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                console.log("Materiales encontrados");
                setMaterials(elements);
                console.log(materials);

            } catch (error) {
                console.error("Error obteniendo materiales:", error);
            }
        };
        fetchMateriales();
    }, []);

    const results = !search ? materials : materials.filter((dato) => dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))
    
    const handleMaterialSelection = (materialId) => {
        setReserva((prev) => ({
            ...prev,
            materiales: prev.materiales.includes(materialId)
                ? prev.materiales.filter((id) => id !== materialId)
                : [...prev.materiales, materialId], // Agregar o quitar el material
        }));
    };

    return (
        <div className="flex flex-col gap-4 relative px-5 md:px-2 lg:px-0 min-h-[100vh]">
            <section className='flex flex-row gap-3'>
                <div className="w-[50%] place-content-center">
                    <Search_input function_search={searcher} />
                </div>
            </section>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center place-content-center gap-y-5 min-h-[50vh]'>
                {results.map((material) => (
                    <Card_selector_reserv
                        key={material.id}
                        id={material.id}
                        tittle={material.nombre}
                        info={material.descripcion}
                        element_img={material.imagen}
                    
                    />
                ))}
            </section>
            <section className="flex justify-end px-10 w-full">
                <button
                    onClick={() => navigate('../nueva_reserva')}
                    className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#F6BF41] rounded-[20px] shadow-lg w-[60%] md:w-[40%] lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'>
                    Siguiente
                </button>
            </section>
        </div>
    )
}