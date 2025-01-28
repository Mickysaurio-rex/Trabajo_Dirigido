import * as React from 'react';
import Info_section from '../../components/profile_components/Info_section';


export default function Profile_page() {
    const [isInEdit, setStateEdit] = React.useState(true);
    return (
        <div className="bg-[url('./public/UPB_30Anios.jpg')] bg-repeat bg-[length:400px_450px] h-screen md:px-16 lg:px-16 py-10 flex ">
            <section className='w-[40%] flex flex-col justify-around items-center py-5'>
                <div className=' w-[80%] h-[70%] place-content-center place-items-center'>
                    <img src="./public/profile_test_img.jpeg" alt="Foto de perfil" className='rounded-[50%] w-[25vw] h-[25vw] object-cover' />
                </div>
                <div className='w-[80%] h-[30%] flex flex-col justify-around items-center'>
                    <button className='bg-[#F6BF41] font-medium text-black drop-shadow-lg rounded-[20px] w-[80%] py-5 transition hover:scale-110 hover:shadow-xl'>
                        Cambiar Foto
                    </button>
                    <button className='bg-[#FA3E41] font-medium text-black drop-shadow-lg rounded-[20px] w-[80%] py-5 transition hover:scale-110 hover:shadow-xl'>
                        Cerrar Sesión
                    </button>
                </div>
            </section>
            <section className='w-[60%] py-5 flex flex-col justify-around'>
                <div className='flex flex-col justify-around h-[80%]'>
                    <Info_section tittle="Nombre" info="Juan Perez" state={isInEdit} />
                    <Info_section tittle="Código" info="56197" state={isInEdit} />
                    <Info_section tittle="Correo" info="mig.molinaflores@gmail.com" state={isInEdit} />
                    <Info_section tittle="Teléfono" info="65163738" state={isInEdit} />
                </div>
                {isInEdit ? (
                    <div className='w-[30%]'>
                        <button onClick={() => setStateEdit(false)} className='bg-[#00224E] drop-shadow-lg text-white rounded-[20px] w-full transition hover:scale-110 hover:shadow-xl py-5'>Editar</button>
                    </div>
                ) : (
                    <div className='w-[60%] flex justify-between'>
                        <button onClick={() => setStateEdit(true)} className='bg-[#FA3E41] drop-shadow-lg text-black rounded-[20px] transition hover:scale-110 hover:shadow-xl py-5 w-[45%]'>Cancelar</button>
                        <button onClick={() => setStateEdit(true)} className='bg-[#F6BF41] drop-shadow-lg text-black rounded-[20px] transition hover:scale-110 hover:shadow-xl py-5 w-[45%]'>Guardar</button>
                    </div>
                )
                }
            </section>
        </div>
    )
}
