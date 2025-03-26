import * as React from 'react';

export default function Info_section({ user, setState }) {
    
    const completeName = user.nombre + " " + user.apellidos

    const Info_user_card = ({ tittle, info }) => {
        return (
            <div className='px-5 h-[15vh] min-h-[100px] flex flex-col gap-2 bg-black/70 backdrop-blur-[3px] rounded-[20px] place-content-center'>
                <h2 className='text-xl text-white'>
                    {tittle}
                </h2>
                <div className='bg-white/60 rounded-[10px] w-full'>
                    <p className='text-black text-md p-2'>{info}</p>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='flex flex-col justify-around h-[80%]'>
                <Info_user_card tittle={'Nombre'} info={completeName} />
                <Info_user_card tittle={'Correo'} info={user.correo} />
                <Info_user_card tittle={'Teléfono'} info={user.telefono} />
            </div>
            <div className='w-full md:w-[30%]'>
                <button onClick={() => setState(true)} className='bg-[#00224E] drop-shadow-lg text-white text-[16px] md:text-[20px] lg:text-[24px] rounded-[20px] w-full transition hover:scale-110 hover:shadow-xl py-5'>Editar</button>
            </div>
        </>

    )
}
