import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[url('./public/Foto-UPB-Campus-La-Paz.jpg')] bg-cover bg-center flex flex-row justify-around items-center w-full h-[30vh] text-white">
            <section className='w-[15%]'>
                <img src='./public/logo_upb.png'/>
            </section>
            <section className=' flex flex-row justify-around w-1/3'>
                <div>
                    <h3>Descubre</h3>
                    <ul className='flex flex-col gap-2'>
                        <li>
                            <NavLink className='flex flex-row gap-2 items-center' to="/">
                            <span class="iconify mdi--home"></span>
                                <p>Inicio</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex flex-row gap-2 items-center'>
                            <span class="iconify mdi--tools"></span>
                                <p>Nuestros Materiales</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex flex-row gap-2 items-center'>
                            <span class="iconify mdi--calendar-month"></span>
                                <p>Reserva Ya!</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex flex-row gap-2 items-center'>
                            <span class="iconify mdi--person"></span>
                                <p>Mi Perfil</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Contactos</h3>
                    <ul>
                        <li>
                            <p>2222222 - 23333333</p>
                        </li>
                        <li>
                            <p>direccion@gmail.com</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='flex flex-col gap-2'>
                <h3>Siguenos</h3>
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
