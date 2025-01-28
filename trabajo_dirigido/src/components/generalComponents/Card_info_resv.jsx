import * as React from 'react';

export default function Card_info_resv({ name, date_s, date_f }) {
    return (
        <div className="w-full h-[20vh] min-h-24 bg-black/60 backdrop-blur-[5px] flex justify-between items-center rounded-[20px] px-2 md:px-5 lg:px-5">
            <section className='w-[50%] md:w-[40%] lg:w-[50%] px-5 lg:px-10'>
                <h2 className="text-white font-medium text-[20px] md:text-[28px] lg:text-[36px]">{name}</h2>
                <p className="text-white text-[12px] md:text-[16px] lg:text-[24px]">{date_s} - {date_f}</p>
            </section>
            <section className='w-[50%] md:w-[40%] lg:w-[30%] flex justify-center'>
                <button className="flex justify-center items-center w-[80%] md:w-[60%] lg:w-[60%] h-[6vh] min-h-10 bg-[#FA3E41] rounded-2xl px-8 py-3 font-semibold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none">Cancelar</button>
            </section>
        </div>
    )
}