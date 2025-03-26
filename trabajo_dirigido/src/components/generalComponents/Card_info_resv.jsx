import * as React from 'react';

export default function Card_info_resv({ event, handleCancel, loading }) {
    const fecha = event.fecha.toDate().toLocaleDateString();
    return (
        <div className="w-full h-[20vh] min-h-[120px] bg-black/60 backdrop-blur-[5px] flex flex-col md:flex-row lg:flex-row justify-between items-center rounded-[20px] px-0 md:px-5 lg:px-5 py-2">
            <section className=' px-5 lg:px-10'>
                <h2 className="text-white font-medium text-[15px] md:text-[28px] lg:text-[36px] text-center md:text-start lg:text-start">Reserva</h2>
                <p className="text-white text-[15px] md:text-[16px] lg:text-[24px]">{fecha}</p>
            </section>

            <section className='w-[50%] md:w-[40%] lg:w-[30%] flex justify-center'>
                <button
                    disabled={loading}
                    onClick={() => handleCancel(event.id)}
                    className={`flex 
                justify-center 
                items-center 
                w-[80%] md:w-[60%] lg:w-[60%] 
                h-[5vh] md:h-[6vh] lg:h-[6vh] min-h-[20px]
                 bg-[#FA3E41] 
                 rounded-2xl 
                 px-8 py-3 
                 font-semibold text-white text-[15px]
                 transition hover:scale-110 hover:shadow-xl focus:outline-none
                 `}>
                    {loading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                    ) : (
                        "Cancelar"
                    )}</button>
            </section>
        </div>
    )
}