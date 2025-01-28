import * as React from 'react';

export default function Card_info_material({ material_name, material_info, number_inventory, name_arm, close_function, state }) {
    return (
        <>
            {state &&
                <div className='w-screen h-screen bg-white/60 flex justify-center items-center absolute'>
                    <div className='flex  flex-col md:flex-row lg:flex-row lg:gap-y-[25px] bg-[#F6BF41] rounded-[30px] w-[80%] h-[90%] lg:h-[70%] '>
                        <section className="bg-[url('./public/UPB_30Anios.jpg')] opacity-40 bg-contain place-content-center justify-items-center w-full lg:w-[40%] h-[30%] lg:h-full">
                            <img src="Sierra_circular.jpg" className='w-[40%] lg:w-[70%]' />
                        </section>
                        <section className='py-3 lg:py-5 lg:px-10 lg:w-[60%] h-[70%] flex flex-col gap-[20px]'>
                            <div className='flex justify-end items-center px-5 lg:px-0'>
                                <button onClick={close_function}>

                                    <span className="iconify mdi--close-box w-[24px] h-[24px] text-black"></span>
                                </button>
                            </div>
                            <section className='flex flex-col gap-[20px] justify-around items-start px-10'>
                                <h2 className='text-black font-bold text-2xl md:text-3xl lg:text-[48px]'>{material_name}</h2>
                                <p className='text-black text-xs md:text-base lg:text-2xl'>{material_info}</p>
                                <article className='text-black flex flex-col gap-[20px]'>
                                    <div className='flex gap-[25px] items-center'>
                                        <p className='font-medium lg:text-[24px]'>En Inventario: </p>
                                        <p className='lg:text-[20px]'>{number_inventory}</p>
                                    </div>
                                    <div className='flex gap-[25px] items-center'>
                                        <p className='font-medium lg:text-[24px]'>Tallas:</p>
                                        <a className='lg:text-[20px]'>S</a>
                                        <a className='lg:text-[20px]'>M</a>
                                        <a className='lg:text-[20px]'>L</a>
                                    </div>
                                    <div className='flex gap-[25px] font-medium items-center'>
                                        <p className='font-medium lg:text-[24px]'>Estante: </p>
                                        <p className='lg:text-[20px]'>{name_arm}</p>
                                    </div>
                                </article>
                            </section>
                            <section className='w-full px-10 flex gap-5'>
                                <button className='font-medium lg:text-[28px] min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                                    Reservar
                                </button>
                                <button className='font-medium lg:text-[28px] min-h-[60px] bg-[#2662B1] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                                    Editar
                                </button>
                            </section>

                        </section>
                    </div>
                </div>
            }
        </>
    )
}
