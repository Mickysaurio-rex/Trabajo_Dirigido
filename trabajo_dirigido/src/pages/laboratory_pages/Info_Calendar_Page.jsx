import "cally"
import Card_black_info from '../../components/home_page_components/Card_black_info';
import * as React from 'react';
import Calendar_info from "../../components/laboratory_components/Calendar_info";
;


export default function Info_Calendar_Page() {
    const tittle1_black = 'Bienvenido';
    const info1_black = 'En esta sección usted tendrá la posibilidad de crear una reserva para el ambiente del laboratorio o visulaizar las fechas que ya se encuentren reservadas.';

    return (
        <>
            <section className='flex justify-center md:flex-row lg:flex-row md:justify-between lg:justify-between'>
                <div className='w-[90%] md:w-[40%] lg:w-[35%]'>
                    <Card_black_info tittle={tittle1_black} info={info1_black} />
                </div>
                <img src="img_card_black1.jpg" className='w-[60%] h-[25vw] object-cover object-top rounded-[60px] drop-shadow-[0_5px_6px_rgba(0,0,0,0.60)] hidden md:block lg:block'></img>
            </section>
            <section className="w-full">
                <Calendar_info />
            </section>

            
        </>
    )
}