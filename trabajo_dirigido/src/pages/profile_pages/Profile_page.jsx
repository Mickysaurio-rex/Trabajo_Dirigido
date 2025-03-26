import * as React from 'react';
import Info_section from '../../components/profile_components/Info_section';
import Form_section from '../../components/profile_components/Form_section';
import { useAuth } from '../../context/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/credenciales";

export default function Profile_page() {
    const { userData, logout, setUserData, user } = useAuth();
    const [isEdit, setStateEdit] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    
    const storage = getStorage(firebaseApp);
    const firestore = getFirestore(firebaseApp);

    // Función para manejar la carga de la imagen
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    // Función para subir la imagen
    const uploadImage = async () => {
        if (!selectedFile) return;

        console.log(user.uid);
        
        setUploading(true);
        try {
            const storageRef = ref(storage, `profile_pictures/${user.uid}`);
            await uploadBytes(storageRef, selectedFile);
            const imageUrl = await getDownloadURL(storageRef);

            // Actualizar URL en Firestore
            const userDocRef = doc(firestore, "usuarios", user.uid);
            await updateDoc(userDocRef, { fotoPerfil: imageUrl });

            // Actualizar estado del usuario
            setUserData(prev => ({ ...prev, fotoPerfil: imageUrl }));
            setSelectedFile(null);
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        }
        setUploading(false);
    };

    return (
        <div className="md:px-16 lg:px-16 py-10 flex flex-col md:flex-row lg:flex-row">
            <section className='md:w-[40%] lg:w-[40%] flex flex-col justify-around items-center py-5 h-[80vh] min-h-[600px]'>
                <div className='w-[80%] h-[70%] place-content-center place-items-center'>
                    <img 
                        src={userData.fotoPerfil || "/profile_test_img.jpeg"} 
                        alt="Foto de perfil" 
                        className='rounded-[50%] w-[25vw] h-[25vw] min-w-[300px] min-h-[300px] object-cover' 
                    />
                </div>
                <div className='w-[80%] h-[30%] flex flex-col justify-around items-center gap-2'>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className='bg-[#F6BF41] font-medium text-black drop-shadow-lg rounded-[20px] w-[80%] py-5 transition hover:scale-110 hover:shadow-xl text-center cursor-pointer'>
                        Seleccionar Foto
                    </label>
                    {selectedFile && (
                        <button 
                            onClick={uploadImage} 
                            className='bg-[#F6BF41] font-medium text-black drop-shadow-lg rounded-[20px] w-[80%] py-5 transition hover:scale-110 hover:shadow-xl'
                            disabled={uploading}
                        >
                            {uploading ? "Subiendo..." : "Guardar Foto"}
                        </button>
                    )}
                    <button 
                        onClick={logout} 
                        className='bg-[#FA3E41] font-medium text-black drop-shadow-lg rounded-[20px] w-[80%] py-5 transition hover:scale-110 hover:shadow-xl'
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </section>
            <section className='px-2 md:px-0 w-full md:w-[60%] py-5 flex flex-col justify-around h-[90vh] min-h-[660px]'>
            {
                !isEdit ? <Info_section user={userData} setState={setStateEdit}/> 
                : <Form_section userProfile={userData} setState={setStateEdit}/>
            }
            </section>
        </div>
    );
}
