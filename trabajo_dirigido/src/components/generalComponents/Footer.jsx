import * as React from 'react';
import { NavLink } from 'react-router-dom';


const navegación = [
    {id: 1, nombre: 'Inicio', icon: 'iconify mdi--home' ,ruta: '/app'},
    {id: 2, nombre: 'Nuestros Materiales', icon: 'iconify mdi--tools', ruta: '/app/materiales'},
    {id: 3, nombre: 'Reserva Ya!', icon: 'iconify mdi--calendar-month', ruta: '/app/reserva'},
    {id: 4, nombre: 'Mi Perfil', icon: 'iconify mdi--person', ruta: '/app/perfil'}
]

export default function Footer() {
    return (
        <footer className="bg-[url('/Foto-UPB-Campus-La-Paz._Oscuro.jpg')] bg-cover bg-center flex flex-col md:flex-row lg:flex-row justify-center md:justify-around lg:justify-around items-center w-full md:h-[30vh] lg:h-[30vh] min-h-[200px] text-white gap-5 md:gap-0 lg:gap-0 py-5 md:py-0 lg:py-0">
            <section className='hidden md:block lg:block md:w-[15%] lg:w-[15%] bg-white rounded-lg '>
                <img src='/logo_upb.png'/>
            </section>
            <section className=' flex flex-col md:flex-row lg:flex-row justify-center items-center md:justify-around lg:justify-around w-full md:w-1/3 lg:w-1/3 h-full'>
                <div className='py-3 flex flex-col justify-around md:h-full lg:h-full'>
                    <h3 className='text-[24px] md:text-[20px] lg:text-[24px]'>Descubre</h3>
                    <ul className='flex flex-col justify-around gap-5 md:gap-0 lg:gap-0 h-full'>
                        {navegación.map((item) => (
                            <li key={item.id}>
                                <NavLink className='flex flex-row gap-2 items-center' to={item.ruta} onClick={() => window.scrollTo({ top: 0})}>
                                    <span class={`${item.icon} text-[20px]`}></span>
                                    <p>{item.nombre}</p>
                                </NavLink>
                            </li>    
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col py-3 gap-2 md:h-full lg:h-full'>
                    <h3 className='text-[24px] md:text-[20px] lg:text-[24px]'>Contactos</h3>
                    <ul className='flex flex-col justify-around gap-5'>
                        <li className='flex flex-row gap-2'>
                            <span class="iconify mdi--phone-hangup text-[20px]"></span>
                            <p>2222222 - 23333333</p>
                        </li>
                        <li className='flex flex-row gap-2'>
                        <span class="iconify mdi--voicemail text-[20px]"></span>
                            <p>direccion@gmail.com</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='flex flex-col gap-2'>
                <h3 className='text-[24px]'>Siguenos</h3>
                <ul className='flex flex-row gap-3'>
                    <li><a href=""><span class="iconify entypo-social--facebook text-[40px]"></span></a></li>
                    <li><a href=""><span class="iconify mdi--instagram text-[40px]"></span></a></li>
                    <li><a href=""><span class="iconify fa6-brands--square-twitter text-[40px]"></span></a></li>
                    <li><a href=""><span class="iconify fa-brands--whatsapp-square text-[40px]"></span></a></li>
                </ul>
            </section>
        </footer>
    )
}
