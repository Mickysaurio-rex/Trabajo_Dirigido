import { useEffect, useState } from "react";
import Card_selector_category from "../../components/material_components/Card_selector_category"
import firebaseApp from "../../firebase/credenciales";
import { getDocs, collection, getFirestore } from "firebase/firestore";


export default function Material_category_page() {
    const [categorias, setCategorias] = useState([]);
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "categorias"));
                console.log(querySnapshot.docs[0].data());
                const lista = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCategorias(lista);
            } catch (error) {
                console.error("Error obteniendo materiales:", error);
            }
        };

        fetchMateriales();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-y-10 px-2">
            {categorias.map((categoria) => (
                <Card_selector_category tittle={categoria.nombre} />
            ))}
        </div>
    )
}