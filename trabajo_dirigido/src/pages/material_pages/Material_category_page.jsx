import { useEffect, useState } from "react";
import Card_selector_category from "../../components/material_components/Card_selector_category";
import firebaseApp from "../../firebase/credenciales";
import { getDocs, collection, getFirestore } from "firebase/firestore";

export default function Material_category_page() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
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

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <div className="animate-spin rounded-full h-[15vw] w-[15vw] border-t-[20px] border-[#F6BF41]"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-y-10 px-2">
            {categorias.map((categoria) => (
                <Card_selector_category key={categoria.id} tittle={categoria.nombre} />
            ))}
        </div>
    );
}
