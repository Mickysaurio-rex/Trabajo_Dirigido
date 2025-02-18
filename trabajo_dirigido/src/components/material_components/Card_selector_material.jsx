import * as React from 'react';


export default function Card_selector_material({ tittle, info, button_function }) {
    return (
        <div class="bg-[#D9D9D9]/80 backdrop-blur-sm rounded-[30px] flex flex-col py-5 px-5 h-[55vh] min-h-[450px] w-[25vw] min-w-[300px] md:min-w-[330px] lg:min-w-[330px] lg:max-w-lg">
            <section onClick={button_function} className='h-[90%] cursor-pointer flex flex-col gap-1 scrollbar-hide'>    
                    <div className="w-full h-[50%] flex justify-center rounded-lg">
                        <img class="rounded-lg bg-cover w-full" src="/public/fondo_login.jpg" alt="" />
                    </div>
                    <div className='overflow-y-auto h-[45%]'>
                        <h5 class="mb-2 text-2xl lg:text-3xl font-bold tracking-tight text-black">{tittle}</h5>
                        <p class="mb-3 text-[16px] text-black">{info}</p>
                    </div>       
            </section>
            <button className="w-full h-[6vh] min-h-[40px] bg-gradient-to-r from-[#FF4B4B] to-[#A81A04] rounded-[10px] transition hover:scale-110 hover:shadow-xl focus:outline-none">
                Eliminar
            </button>
        </div>

    )
}