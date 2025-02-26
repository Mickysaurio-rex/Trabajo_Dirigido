import * as React from 'react';
import Info_section from '../../components/profile_components/Info_section';
import Form_section from '../../components/profile_components/Form_section';
import { useAuth } from '../../context/AuthContext';


export default function Profile_page() {
    const { userData, logout } = useAuth();
    const [isEdit, setStateEdit] = React.useState(false);

    return (
        <div className=" md:px-16 lg:px-16 py-10 flex flex-col md:flex-row lg:flex-row">
            <section className='md:w-[40%] lg:w-[40%] flex flex-col justify-around items-center py-5 h-[80vh] min-h-[600px]'>
                <div className=' w-[80%] h-[70%] place-content-center place-items-center'>
                    <img src="/profile_test_img.jpeg" alt="Foto de perfil" className='rounded-[50%] w-[25vw] h-[25vw] min-w-[300px] min-h-[300px] object-cover' />
                </div>
                <div className='w-[80%] h-[30%] flex flex-col justify-around items-center'>
                    <button className='bg-[#F6BF41] font-medium text-black drop-shadow-lg rounded-[20px] w-[80%] py-5 transition hover:scale-110 hover:shadow-xl'>
                        Cambiar Foto
                    </button>
                    <button 
                    onClick={logout}
                    className='bg-[#FA3E41] font-medium text-black drop-shadow-lg rounded-[20px] w-[80%] py-5 transition hover:scale-110 hover:shadow-xl'>
                        Cerrar Sesión
                    </button>
                </div>
            </section>
            <section className='w-[60%] py-5 flex flex-col justify-around h-[90vh] min-h-[660px]'>
            {
                !isEdit ? <Info_section user={userData} setState={setStateEdit}/>
                : <Form_section userProfile={userData} setState={setStateEdit}/>
            }
            </section>
        </div>
    )
}
