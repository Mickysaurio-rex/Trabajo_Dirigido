import * as React from 'react';

export default function Card_info({ tittle, info, icon_name }) {
    return (
        <div className="flex flex-col justify-around lg:justify-between items-center p-2 lg:p-5 bg-[#F6BF41]/70 backdrop-blur-[4px] drop-shadow-[0_5px_6px_rgba(0,0,0,0.60)] 
        rounded-[50px] w-[95%] h-[95%] max-w-[400px]">
            <span className={`${icon_name} h-[30%] w-full lg:h-[45%] text-black`}></span>
            <section className='h-[50%] w-full place-content-start'>
                <h2 className="text-[16px] md:text-[16px] lg:text-[20px] text-black font-bold text-center">
                    {tittle}
                </h2>
                <p className="text-[12px] md:text-[12px] lg:text-[16px] text-black font-medium text-center">
                    {info}
                </p>
            </section>
        </div>
    )
}