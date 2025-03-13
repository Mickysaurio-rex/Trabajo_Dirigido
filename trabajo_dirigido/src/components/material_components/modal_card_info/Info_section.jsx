import * as React from 'react'
import { useAuth } from '../../../context/AuthContext'

export default function Info_section({ element, setStateEdit }) {

    const { userData } = useAuth();

    const handleEdit = () => {
        setStateEdit(true)
    }

    return (
        <>
            <section className='flex flex-col gap-[20px] justify-around items-start px-10 w-full overflow-y-auto'>
                <h2 id='materialName' className='text-black font-bold text-2xl md:text-3xl lg:text-[48px]'>{element.nombre}</h2>
                <p className='text-black text-xs md:text-base lg:text-2xl'>{element.descripcion}</p>
                <article className='text-black flex flex-col gap-[20px] w-full'>
                    <div className='flex gap-[25px] font-medium items-center'>
                        <p className='font-medium lg:text-[24px]'>Código: </p>
                        <p className='lg:text-[20px]'>{element.codigo}</p>
                    </div>
                    <div className='flex gap-[25px] font-medium items-center'>
                        <p className='font-medium lg:text-[24px]'>Marca: </p>
                        <p className='lg:text-[20px]'>{element.marca}</p>
                    </div>
                    <div className='flex gap-[25px] font-medium items-center'>
                        <p className='font-medium lg:text-[24px]'>Año de adquisición: </p>
                        <p className='lg:text-[20px]'>{element.year}</p>
                    </div>
                    <div className='flex gap-[25px] font-medium items-center'>
                        <p className='font-medium lg:text-[24px]'>Estante: </p>
                        <p className='lg:text-[20px]'>{element.estante}</p>
                    </div>
                </article>
            </section>
            <section className='w-full px-10 flex gap-5'>
                <button
                    onClick={handleEdit}
                    className='font-medium text-white lg:text-[28px] min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                    Reservar
                </button>
                {userData.rol === 'admin' &&
                    <button
                        onClick={handleEdit}
                        className='font-medium text-white lg:text-[28px] min-h-[60px] bg-[#2662B1] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                        Editar
                    </button>
                }
            </section>
        </>
    )
}