import * as React from 'react';

export default function Card_info_resv({ event }) {

    const getStateColor = (state) => {
        switch (state) {
            case 'Aprobado':
                return 'text-green-500';
            case 'En aprobación':
                return 'text-yellow-500';
            case 'Cancelado':
                return 'text-red-500';
            case 'En Proceso':
                return 'text-blue-500';
            default:
                return 'text-white'; 
        }
    }

    const styleButton = (state) =>{
        if(state === 'Cancelado') {
            return 'hidden'
        }else{
            return 'block'
        }
    }

    return (
        <div className="w-full h-[20vh] min-h-[120px] bg-black/60 backdrop-blur-[5px] flex flex-col md:flex-row lg:flex-row justify-between items-center rounded-[20px] px-0 md:px-5 lg:px-5 py-2">
            <section className=' px-5 lg:px-10'>
                <h2 className="text-white font-medium text-[15px] md:text-[28px] lg:text-[36px] text-center md:text-start lg:text-start">{event.name}</h2>
                <p className="text-white text-[15px] md:text-[16px] lg:text-[24px]">{event.date_s} - {event.date_f}</p>
            </section>
            <section>
                <h2 className={`text-[15px] md:text-[28px] lg:text-[36px] font-semibold ${getStateColor(event.state)}`}>{event.state}</h2>
            </section>
            <section className='w-[50%] md:w-[40%] lg:w-[30%] flex justify-center'>
                <button 
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
                 ${styleButton(event.state)}`}>
                    Cancelar</button>
            </section>
        </div>
    )
}