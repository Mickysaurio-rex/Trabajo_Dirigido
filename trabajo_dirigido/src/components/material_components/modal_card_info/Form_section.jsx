import { Formik } from "formik";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../../../firebase/credenciales";
import { useState } from "react";

export default function Form_section({element, setStateEdit, setImage, setMaterials, setElement}) {
    const firestore = getFirestore(firebaseApp);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const materialRef = doc(firestore, "materiales", element.id);
            await updateDoc(materialRef, {
                nombre: values.nombre,
                descripcion: values.descripcion,
                codigo: values.codigo,
                marca: values.marca,
                year: values.year,
                estante: values.estante,
                cantidad: values.cantidad
            });
            setMaterials(prevMaterials =>
                prevMaterials.map(mat => mat.id === element.id ? { ...mat, ...values } : mat)
            );
            setElement(prevElement => ({ ...prevElement, ...values }));
            setLoading(false);
            alert("Material actualizado correctamente");
            setStateEdit(false);
        } catch (error) {
            console.error("Error al actualizar el material:", error);
            alert("Error al actualizar el material");
        }
    };
    return (
        <>
            <Formik
            initialValues={{
                nombre: element.nombre || "",
                descripcion: element.descripcion || "",
                codigo: element.codigo || "",
                marca: element.marca || "",
                year: element.year || "",
                estante: element.estante || "",
                cantidad: element.cantidad || ""
            }}
            onSubmit={handleUpdate}>
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="flex flex-col md:gap-y-8 h-full">
                    <section className="flex flex-col gap-5 px-10  w-full h-[80%] md:justify-center">
                        <input
                            name="nombre"
                            placeholder="Nombre"
                            value={values.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-black font-bold text-2xl md:text-3xl lg:text-[48px] rounded-lg w-full md:w-[80%] px-2"
                        />
                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            value={values.descripcion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-black text-xs md:text-base lg:text-2xl rounded-lg w-full md:w-[80%] px-2"
                        />
                        <article className="text-black flex flex-col gap-5 w-full overflow-y-auto">
                            {[
                                { label: "Código", name: "codigo" },
                                { label: "Marca", name: "marca" },
                                { label: "Año de adquisición", name: "year" },
                                { label: "Estante", name: "estante" },
                                { label: "Cantidad", name: "cantidad"}
                            ].map(({ label, name }) => (
                                <div key={name} className="flex gap-5 font-medium items-center">
                                    <p className="font-medium lg:text-[24px]">{label}:</p>
                                    <input
                                        name={name}
                                        placeholder={label}
                                        value={values[name]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="lg:text-[20px] rounded-lg px-1"
                                    />
                                </div>
                            ))}
                        </article>
                    </section>
                    <section className="w-full px-10 flex gap-5 items-center h-[20%]">
                        <button
                            type="submit"
                            disabled={loading}
                            className="font-medium text-white md:text-[20px] lg:text-[28px] min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl flex justify-center items-center"
                        >
                            {loading ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                                        ) : (
                                            "Guardar"
                                        )}
                        </button>
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => {setStateEdit(false); setImage(null);}}
                            className="font-medium md:text-[20px] lg:text-[28px] min-h-[60px] bg-[#FA3E41] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl"
                        >
                            Cancelar
                        </button>
                    </section>
                </form>
            )}
            </Formik>
        </>
    )
}
