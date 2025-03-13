import { Formik } from "formik";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../../../firebase/credenciales";

export default function Form_section({element, setStateEdit, setImage, uploadImage}) {
    const firestore = getFirestore(firebaseApp);

    const handleUpdate = async (values) => {
        try {
            const materialRef = doc(firestore, "materiales", element.id);
            await updateDoc(materialRef, {
                nombre: values.nombre,
                descripcion: values.descripcion,
                codigo: values.codigo,
                marca: values.marca,
                year: values.year,
                estante: values.estante
            });
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
                estante: element.estante || ""
            }}
            onSubmit={handleUpdate}>
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                    <section className="flex flex-col gap-5 px-10 w-full">
                        <input
                            name="nombre"
                            placeholder="Nombre"
                            value={values.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-black font-bold text-2xl md:text-3xl lg:text-[48px] rounded-lg w-[80%]"
                        />
                        <input
                            name="descripcion"
                            placeholder="Descripción"
                            value={values.descripcion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="text-black text-xs md:text-base lg:text-2xl rounded-lg w-[80%]"
                        />
                        <article className="text-black flex flex-col gap-5 w-full">
                            {[
                                { label: "Código", name: "codigo" },
                                { label: "Marca", name: "marca" },
                                { label: "Año de adquisición", name: "year" },
                                { label: "Estante", name: "estante" }
                            ].map(({ label, name }) => (
                                <div key={name} className="flex gap-5 font-medium items-center">
                                    <p className="font-medium lg:text-[24px]">{label}:</p>
                                    <input
                                        name={name}
                                        placeholder={label}
                                        value={values[name]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="lg:text-[20px] rounded-lg"
                                    />
                                </div>
                            ))}
                        </article>
                    </section>
                    <section className="w-full px-10 flex gap-5">
                        <button
                            type="submit"
                            className="font-medium lg:text-[28px] min-h-[60px] bg-[#2662B1] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={() => {setStateEdit(false); setImage(null);}}
                            className="font-medium lg:text-[28px] min-h-[60px] bg-[#FA3E41] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl"
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