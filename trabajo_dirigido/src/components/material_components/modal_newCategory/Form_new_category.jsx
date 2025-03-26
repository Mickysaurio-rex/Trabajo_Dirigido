import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import firebaseApp from "../../../firebase/credenciales";
import { addDoc, collection, getFirestore } from "firebase/firestore";


export default function Form_new_category({ state, setState, setCategorias }) {
    const firestore = getFirestore(firebaseApp);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (state) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [state]);

    const handleCreateCategory = async (values) => {
        setIsSaving(true);
        try {
            const docRef = await addDoc(collection(firestore, 'categorias'), {
                nombre: values.nombreCat
            });
            setCategorias((prevCategoria) => [
                ...prevCategoria,
                { id: docRef.id, nombre: values.nombreCat }
            ]);
            setIsSaving(false);
            alert('Categoría guardada exitosamente.');
        } catch (error) {
            alert('Error al guardar la categoría, intentelo más tarde.');
        }
    }

    return (
        <>
            {state &&
                <div className="absolute top-0 left-0 bg-white/60 backdrop-blur-lg h-screen w-screen place-items-center place-content-center">
                    <div className="w-[50vw] min-w-[350px] bg-gradient-to-br from-[#FFE09E] to-[#F6BF49] place-content-center place-items-center p-10 rounded-2xl">
                        <Formik
                            onSubmit={async (values, { resetForm }) => {
                                await handleCreateCategory(values);
                                resetForm();
                                setState(false);
                            }
                            }
                            initialValues={{ nombreCat: "" }}>
                            {({ values, touched, handleSubmit, handleChange, handleBlur }) =>
                            (<form onSubmit={handleSubmit} className='flex flex-col md:w-[90%] lg:w-[90%] justify-between h-full items-center gap-10'>
                                <article className='flex flex-col gap-5'>
                                    <label htmlFor="name_category" className='text-black font-semibold text-[18px] md:text-[22px] lg:text-[24px] text-center'>Ingrese el nombre de la nueva categoría</label>
                                    <input id="name_category"
                                        required
                                        name={"nombreCat"}
                                        value={values.nombreCat}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isTouched={touched["nombreCat"]}
                                        className='w-full h-[5vh] md:h-[6vh] lg:h-[6vh] rounded-[20px] bg-white/80 px-5'></input>
                                </article>
                                <section className='w-full h-[20%] flex justify-between items-center'>
                                    <button
                                        type='button'
                                        onClick={() => { setState(false) }}
                                        disabled={isSaving}
                                        className='font-medium md:text-[20px] lg:text-[28px] min-h-[60px] bg-[#FA3E41] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                                        Cancelar
                                    </button>
                                    <button
                                        type='submit'
                                        disabled={isSaving}
                                        className='font-medium md:text-[20px] lg:text-[28px] text-white min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl flex justify-center items-center'>
                                        {isSaving ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                                        ) : (
                                            "Guardar"
                                        )}
                                    </button>
                                </section>
                            </form>)}
                        </Formik>
                    </div>
                </div>}
        </>
    )
}