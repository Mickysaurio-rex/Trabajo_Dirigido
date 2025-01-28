import * as React from 'react';
import Card_info from '../components/home_page_components/Card_Info';
import Card_black_info from '../components/home_page_components/Card_black_info';


export default function Home_page(){
    const tittle1_black = "Bienvenido"
    const info1_black = "En esta página usted podrá observar los materiales que nuestros laboratorio pueden preveer y si así lo desea reservar para propósitos académicos. "
    const tittle1 = "Nuestros Materiales"
    const info1 = "Visualiza los elementos con los que contamos, sus características y la cantidad de unidades."
    const icon_name1 = "iconify mdi--tools"
    

    return(
    <div className="md:px-16 lg:px-16 py-16 flex flex-col gap-20 md:gap-30 lg:gap-40">
        <section className='flex justify-center md:flex-row lg:flex-row md:justify-between lg:justify-between'>
            <div className='w-[90%] md:w-[40%] lg:w-[35%]'>
                <Card_black_info tittle={tittle1_black} info={info1_black}/>
            </div>
            <img src="img_card_black1.jpg" className='w-[60%] h-[25vw] object-cover object-top rounded-[60px] drop-shadow-[0_5px_6px_rgba(0,0,0,0.60)] hidden md:block lg:block'></img>
        </section>
        <section>
            <div className='flex flex-col gap-10 md:flex-row lg:flex-row justify-between items-center px-10'>
                <Card_info tittle={tittle1} info={info1} icon_name={icon_name1}/>
                <Card_info tittle={tittle1} info={info1} icon_name={icon_name1}/>
                <Card_info tittle={tittle1} info={info1} icon_name={icon_name1}/>
            </div>
        </section>
        <section className='flex justify-center md:flex-row lg:flex-row md:justify-between lg:justify-between'>
            <img src="img_card_black1.jpg" className='w-[60%] h-[25vw] object-cover object-top rounded-[60px] drop-shadow-[0_5px_6px_rgba(0,0,0,0.60)] hidden md:block lg:block'></img>
            <div className="w-[90%] md:w-[40%] lg:w-[35%]">
                <Card_black_info tittle={tittle1_black} info={info1_black}/>
            </div>
        </section>
    </div>
    )
}