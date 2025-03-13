import * as React from 'react';

export default function Card_black_info({tittle, info}){
    return(
        <div className="flex flex-col justify-center py-16 px-5 backdrop-blur-[5px] drop-shadow-[0_5px_6px_rgba(0,0,0,0.60)] bg-black/50 rounded-[30px] md:rounded-[40px] lg:rounded-[50px] w-full h-auto md:h-[25vw] lg:h-[25vw] lg:min-w-[380px]">
            <h2 className="sm:text-[36px] md:text-[35px] lg:text-[45px] text-white font-bold">
                {tittle}    
            </h2>
            <p className="sm:text-[8px] md:text-[12px] lg:text-[20px] text-white font-normal ">
                {info}
            </p>
        </div>
    )
}