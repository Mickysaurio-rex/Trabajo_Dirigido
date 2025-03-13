import * as React from 'react';
import Card_info from '../../components/home_page_components/Card_Info';
import Card_black_info from '../../components/home_page_components/Card_black_info';


export default function Home_page(){
    const tittle1_black = {tittle: "Bienvenido", info: "En esta página usted podrá visualizar los materiales con los que contamos; además, reservar el espacio del laboratorio o los elementos necesarios para el desarollo de sus proyectos. "}
    const tittle2_black = {tittle: "Nuestro Objetivo", info: "Esta plataforma se centra en ayudar a los estudiantes y docentes a tener una manera rápida y sencilla para acceder a los materiales con los que cuenta la universidad. "}
    const info_card_y = [{tittle: "Nuestros Materiales", info: "Visualiza los elementos con los que contamos, sus características y la cantidad de unidades.", icon:"iconify mdi--tools"},
        {tittle: "Reserva Ya!", info: "Crea una reserva para utilizar los materiales con los que contamos en el laboratorio", icon:"iconify mdi--calendar-month"},
        {tittle: "Laboratorios", info: "Visualiza las fechas de reserva del espacio, y crea una para llevar tu clase.", icon: "iconify mdi--flask" }
    ]


    return(
    <div className="md:px-16 lg:px-16 py-16 flex flex-col gap-20 md:gap-30 lg:gap-40">
        <section className='flex justify-center md:flex-row lg:flex-row md:justify-between lg:justify-between gap-x-2'>
            <div className='w-[90%] md:w-[40%] lg:w-[35%]'>
                <Card_black_info tittle={tittle1_black.tittle} info={tittle1_black.info}/>
            </div>
            <img src="img_card_black1.jpg" className='w-[60%] h-[25vw] object-cover object-top rounded-[60px] drop-shadow-[0_5px_6px_rgba(0,0,0,0.60)] hidden md:block lg:block'></img>
        </section>
        <section className='grid md:grid-cols-3 lg:grid-cols-3 place-items-center place-self-center w-[70%] min-h-[700px] md:min-h-[250px] lg:min-h-[400px] md:w-full lg:w-full '>
                {info_card_y.map((info_card) => {
                    return <Card_info tittle={info_card.tittle} info={info_card.info} icon_name={info_card.icon} />
                })}
        </section>
        <section className='flex justify-center md:flex-row lg:flex-row md:justify-between lg:justify-between gap-x-2'>
            <img src="img_card_black1.jpg" className='w-[60%] h-[25vw] object-cover object-top rounded-[60px] drop-shadow-[0_5px_6px_rgba(0,0,0,0.60)] hidden md:block lg:block'></img>
            <div className="w-[90%] md:w-[40%] lg:w-[35%]">
                <Card_black_info tittle={tittle2_black.tittle} info={tittle2_black.info}/>
            </div>
        </section>
    </div>
    )
}