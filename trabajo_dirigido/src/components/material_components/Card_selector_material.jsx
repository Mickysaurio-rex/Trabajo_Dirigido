import * as React from 'react';


export default function Card_selector_material({tittle, info, button_function}) {
    return (
        <div class="max-w-sm bg-[#D9D9D9]/80 backdrop-blur-sm rounded-[30px] flex flex-col py-5 px-5">
            <div href="#" className="w-full h-[40%] flex justify-center rounded-lg">
                <img class="rounded-lg " src="./fondo_login.jpg" alt="" />
            </div>
            <div class="">
                <a href="#">
                    <h5 class="mb-2 text-3xl font-bold tracking-tight text-black">{tittle}</h5>
                </a>
                <p class="mb-3 text-[20px] text-black">{info}</p>
                <button onClick={button_function} className="w-full h-[6vh] bg-gradient-to-r from-[#FF4B4B] to-[#A81A04] rounded-[10px] transition hover:scale-110 hover:shadow-xl focus:outline-none">
                    Eliminar
                </button>
            </div>
        </div>

    )
}