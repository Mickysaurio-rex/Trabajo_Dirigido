import { useEffect, useState } from 'react';
import Search_input from '../../components/generalComponents/Search_Input';
import Card_selector_material from '../../components/material_components/Card_selector_material';
import Card_info_material from '../../components/material_components/modal_card_info/Card_info_material';
import Form_new_material from '../../components/material_components/Form_new_material';
import firebaseApp from "../../firebase/credenciales";
import { getDocs, collection, getFirestore, where, query, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../context/CategoryContext';
import { useAuth } from '../../context/AuthContext';

export default function Material_selector_page() {
    const [categorias, setCategorias] = useState([]);
    const [stateModal, setStateModal] = useState(false);
    const [stateNewMat, setStateNewMat] = useState(false);
    const [elementModal, setElementModal] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] =useState(true);
    const [loadingDelete, setLoadinDelete] = useState(false); 
    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    const navigate = useNavigate();
    const { userData } = useAuth();
    const { categoria } = useCategory();

    const searcher = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "categorias"));
                const lista = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const queryMateriales = await getDocs(query(collection(firestore, "materiales"), where("categoria", "==", categoria)));
                const elements = queryMateriales.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setCategorias(lista);
                setMaterials(elements);
            } catch (error) {
                console.error("Error obteniendo materiales:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMateriales();
    }, []);

    const handleDelete = async (id, imageUrl) => {
        setLoadinDelete(true);
        try {
            if (imageUrl) {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }
            await deleteDoc(doc(firestore, "materiales", id));
            setMaterials(materials.filter(material => material.id !== id));
        } catch (error) {
            console.error("Error eliminando material o imagen:", error);
        }finally{
            setLoadinDelete(false);
        }
    };

    const results = !search ? materials : materials.filter((dato) => dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))

    return (
        <>
            <div className="flex flex-col gap-4 relative px-2 md:px-2 lg:px-0 min-h-[100vh]">
                <section className='flex flex-row gap-3'>
                    <div className="w-[50%] ">
                        <Search_input function_search={searcher} />
                    </div>
                    <div className="w-[50%] flex flex-col md:flex-row lg:flex-row justify-around md:items-center gap-2">
                        {userData.rol === 'admin' &&
                            <button
                                onClick={() => setStateNewMat(true)}
                                className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg md:w-[40%] lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'>
                                Agregar
                            </button>}
                        <button
                            onClick={() => navigate('../reserva')}
                            className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#F6BF41] rounded-[20px] shadow-lg md:w-[40%] lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                            Reservar
                        </button>
                    </div>
                </section>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center place-content-center gap-y-5 min-h-[50vh]'>
                    {loading ? (
                        <div className="col-span-full flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                        </div>
                    ) : (
                        results.map((element) => (
                            <Card_selector_material
                                key={element.id}
                                id={element.id}
                                tittle={element.nombre}
                                info={element.descripcion}
                                element_img={element.imagen}
                                onDelete={handleDelete}
                                button_function={() => { setStateModal(true); setElementModal(element); }}
                                loading={loadingDelete}
                            />
                        ))
                    )}
                </section>
            </div>
            <Card_info_material state={stateModal} setStateModal={setStateModal} element={elementModal} setMaterials={setMaterials} setElement={setElementModal}/>
            <Form_new_material state={stateNewMat} setState={setStateNewMat} categorias={categorias} setMaterials={setMaterials} />
        </>
    )
}