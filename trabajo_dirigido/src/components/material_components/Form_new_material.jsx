import React from 'react'
import { Formik } from 'formik'
import firebaseApp from "../../firebase/credenciales";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"

export default function Form_new_material({ state, setState, categorias, setMaterials }) {
    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);

    const [selectedFile, setSelectedFile] = React.useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (values) => {
        try {
            let imageUrl = '';

            // Subir imagen si se ha seleccionado un archivo
            if (selectedFile) {
                const storageRef = ref(storage, `materiales/${selectedFile.name}`);
                await uploadBytes(storageRef, selectedFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            // Guardar los datos en Firestore
            const docRef = await addDoc(collection(firestore, 'materiales'), {
                nombre: values.Nombre,
                descripcion: values.Descripción,
                codigo: values.Código,
                year: values.Año,
                marca: values.Marca,
                categoria: values.Categoría,
                estante: values.Estante,
                imagen: imageUrl, // Guardamos la URL de la imagen
            });

            setMaterials((prevMaterials) => [
                ...prevMaterials,
                {
                    id: docRef.id,
                    nombre: values.Nombre,
                    descripcion: values.Descripción,
                    codigo: values.Código,
                    year: values.Año,
                    marca: values.Marca,
                    categoria: values.Categoría,
                    estante: values.Estante,
                    imagen: imageUrl,
                }
            ]);

            alert('Material guardado exitosamente');
            setSelectedFile(null);
            setState(false);
        } catch (error) {
            console.error('Error al guardar: ', error);
            alert('Error al guardar el material');
        }
    };


    return (
        <>
            {state &&
                <div className='absolute top-0 left-0 bg-white/60 backdrop-blur-lg h-screen w-screen place-items-center place-content-center'>
                    <div className='bg-gradient-to-br from-[#FFE09E] to-[#F6BF49] w-[95%] md:w-[60%] lg:w-[60%] min-h-[350px] h-[90%] p-5 flex flex-col items-center rounded-[40px] z-50'>
                        <h1 className='text-xl md:text-2xl lg:text-3xl font-bold'>Formulario: Nueva entrada</h1>
                        <Formik
                            initialValues={{
                                Nombre: "", Descripción: "", Código: "", Año: "", Marca: "", Categoría: "", Estante: ""
                            }}
                            onSubmit={async (valores, { resetForm }) => {
                                await handleSubmit(valores);
                                resetForm();
                            }}
                        >
                            {({ values, touched, handleSubmit, handleChange, handleBlur }) => (
                                <form onSubmit={handleSubmit} className='flex flex-col md:w-[90%] lg:w-[90%] justify-between h-full items-center'>
                                    <section className='h-[80%] w-full flex flex-col justify-between overflow-y-auto px-2 gap-y-2'>
                                        {Object.keys(values).filter(key => key !== "Categoría").map((key) => {
                                            return (
                                                <div className='flex flex-col gap-1'>
                                                    <label htmlFor={`input_${key}`} className='text-black text-[18px] md:text-[22px] lg:text-[24px] font-medium'>{key}</label>
                                                    <input 
                                                        key={key}
                                                        id={`input_` + key}
                                                        name={key}
                                                        value={values[key]}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isTouched={touched[key]}
                                                        className='w-full h-[5vh] md:h-[6vh] lg:h-[6vh] rounded-[20px] bg-white/80 px-5' />
                                                </div>
                                            )
                                        })
                                        }
                                        <div className='flex flex-col gap-1 font-medium'>
                                            <label className='text-black text-[18px] md:text-[22px] lg:text-[24px]'>Categoría</label>
                                            <input
                                                key={"Categoría"}
                                                type="text"
                                                name={"Categoría"}
                                                className='w-full h-[6vh] rounded-[20px] bg-white/80 px-5'
                                                list="categoria-list"
                                                value={values.Categoría}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isTouched={touched["Categoría"]}
                                            />
                                            <datalist id="categoria-list">
                                                {categorias.map((categoria) => (
                                                    <option key={categoria.id} value={categoria.nombre} />
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className='flex flex-col gap-1 font-medium'>
                                            <label className='text-black text-[18px] md:text-[22px] lg:text-[24px]' >Imagen</label>
                                            <input key={"File"} type='file' accept="image/*" id='input_foto' className='w-[80%]' onChange={handleFileChange} />
                                        </div>
                                    </section>
                                    <section className='w-full h-[20%] flex justify-between items-center'>
                                        <button
                                            type='button'
                                            onClick={() => {setState(false)}}
                                            className='font-medium lg:text-[28px] min-h-[60px] bg-[#FA3E41] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                                            Cancelar
                                        </button>
                                        <button
                                            type='submit'
                                            className='font-medium lg:text-[28px] min-h-[60px] bg-[#2662B1] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                                            Guardar
                                        </button>
                                    </section>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            }
        </>
    )
}
