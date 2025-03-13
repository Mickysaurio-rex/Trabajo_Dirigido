import * as React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Card_selector_material({ tittle, info, button_function, element_img, id, onDelete }) {
    const { userData } = useAuth();
    
    return (
        <div className="bg-[#D9D9D9]/80 backdrop-blur-sm rounded-[30px] flex flex-col py-5 px-5 h-[55vh] min-h-[450px] w-[25vw] min-w-[300px] md:min-w-[330px] lg:min-w-[330px] lg:max-w-lg">
            <section onClick={button_function} className='h-[90%] cursor-pointer flex flex-col gap-1 scrollbar-hide'>    
                    <div className="w-full h-[50%] flex justify-center items-center rounded-lg bg-gradient-to-br from-[#FFE09E] to-[#F6BF49]">
                        <img className="rounded-lg bg-cover w-[80%] h-[90%]" src={element_img} alt="" />
                    </div>
                    <div className='overflow-y-auto h-[45%]'>
                        <h5 className="mb-2 text-2xl lg:text-3xl font-bold tracking-tight text-black">{tittle}</h5>
                        <p className="mb-3 text-[16px] text-black">{info}</p>
                    </div>       
            </section>
            {userData.rol === 'admin' &&
            <button
            type='button'
            onClick={() => onDelete(id, element_img)} 
            className="w-full h-[6vh] min-h-[40px] bg-gradient-to-r from-[#FF4B4B] to-[#A81A04] rounded-[10px] text-white transition hover:scale-110 hover:shadow-xl focus:outline-none">
                Eliminar
            </button>
            }
            
        </div>

    )
}