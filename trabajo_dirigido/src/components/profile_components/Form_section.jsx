import * as React from 'react'
import { Formik } from 'formik';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import firebaseApp from '../../firebase/credenciales';
import { useAuth } from '../../context/AuthContext';

const firestore = getFirestore(firebaseApp);

export default function Form_section({ userProfile, setState }) {

    const { setUserData, user } = useAuth();
   
    const initialValues = {
        nombre: userProfile?.nombre || "",
        apellidos: userProfile?.apellidos || "",
        correo: userProfile?.correo || "",
        telefono: userProfile?.telefono || ""
    };

    const actualizarUsuario = async (values) => {
        if (!user || !user.uid) {
            console.error("No hay usuario autenticado.");
            alert("Error: No hay usuario autenticado.");
            return;
        }
    
        try {
            const userRef = doc(firestore, `usuarios/${user.uid}`);
        
            // Fusionar los datos actuales con los nuevos sin sobrescribir la foto u otros campos no incluidos en el formulario
            const nuevosDatos = {
                ...userProfile, // Datos previos
                ...values,     // Datos actualizados desde el formulario
            };
    
            // Actualizar en Firestore
            await updateDoc(userRef, nuevosDatos);
            console.log("Datos actualizados correctamente en Firestore.");
            alert("Datos actualizados correctamente.");
    
            // Actualizar el estado global
            setUserData(nuevosDatos);
    
            // Cerrar el formulario de edición
            setState(false);
        } catch (error) {
            console.error("Error al actualizar los datos:", error);
            alert("Hubo un error al actualizar los datos.");
        }
    };
    
    const Input_user_card = ({ tittle, value, name, function_onChange, function_onBlur, isDisabled }) => {
        return (
            <div className='px-5 h-[15vh] min-h-[100px] max-h-[200px] flex flex-col gap-2 bg-black/70 backdrop-blur-[3px] rounded-[20px] place-content-center'>
                <h2 className='text-xl text-white'>
                    {tittle}
                </h2>
                <div className='bg-white/60 rounded-[10px] w-full'>
                    <input className='w-full rounded-[10px] p-2 text-md' value={value} 
                        name={name}
                        onChange={function_onChange}
                        onBlur={function_onBlur}
                        disabled={isDisabled}
                         />
                </div>
            </div>
        )
    }

    return (
            <Formik
            onSubmit={async (valores) => {actualizarUsuario(valores)}}
            initialValues={initialValues}>
                 {({ values, touched, handleSubmit, handleChange, handleBlur }) => (
                <form onSubmit={handleSubmit} className='h-full flex flex-col justify-between'>
                    <div className='flex flex-col justify-around h-[90%]'>
                        {Object.keys(initialValues).map((key) => (
                            <Input_user_card 
                                key={key} 
                                title={key} 
                                name={key} 
                                value={values[key]} 
                                function_onChange={handleChange} 
                                function_onBlur={handleBlur}
                                isTouched={touched[key]}
                                isDisabled={key === "correo"} 
                            />
                        ))}
                    </div>
                    <div className='w-[60%] flex justify-between'>
                        <button
                            type='button'
                            onClick={() => setState(false)}
                            className='bg-[#FA3E41] drop-shadow-lg text-black rounded-[20px] transition hover:scale-110 hover:shadow-xl py-5 w-[45%]'
                        >
                            Cancelar
                        </button>
                        <button 
                            type='submit' 
                            className='bg-[#F6BF41] drop-shadow-lg text-black rounded-[20px] transition hover:scale-110 hover:shadow-xl py-5 w-[45%]'
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            )}
            </Formik>
    )
}