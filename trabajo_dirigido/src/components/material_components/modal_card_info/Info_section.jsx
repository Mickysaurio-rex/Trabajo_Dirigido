import * as React from 'react'
import { useAuth } from '../../../context/AuthContext'

export default function Info_section({ element, setStateEdit }) {

    const { userData } = useAuth();

    const handleEdit = () => {
        setStateEdit(true)
    }
    const dataMaterial = [{ nom_field: 'Código', data_field: element.codigo },
    { nom_field: 'Marca', data_field: element.marca },
    { nom_field: 'Año de adquisición', data_field: element.year },
    { nom_field: 'Estante', data_field: element.estante },
    { nom_field: 'Cantidad', data_field: element.cantidad }
    ]
    return (
        <>
            <section className='flex flex-col px-10 lg:px-0 gap-[20px] justify-around items-start w-full overflow-y-auto'>
                <h2 id='materialName' className='text-black font-bold text-2xl md:text-3xl lg:text-[48px]'>{element.nombre}</h2>
                <p className='text-black text-xs md:text-base lg:text-2xl'>{element.descripcion}</p>
                <article className='text-black flex flex-col gap-[20px] w-full'>
                    {dataMaterial.map((data, index) => (
                        <div key={index} className='flex gap-[25px] font-medium items-center'>
                            <p className='font-medium lg:text-[24px]'>{data.nom_field} </p>
                            <p className='lg:text-[20px]'>{data.data_field}</p>
                        </div>
                    ))}

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