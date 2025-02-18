import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const selector = (isActive) => {
        isActive ? 'text-red-500' : ''
    }

    return (
        <nav class="bg-black rounded-3xl h-[8vh] text-white place-content-center min-h-[70px] m-5">
            <ul class="font-bold flex flex-row justify-around">
                <NavLink to="/app" >
                    <li className={`flex flex-row items-center gap-1 ${selector}`}>
                        <span class="iconify mdi--home"></span>
                        <p className='hidden md:block lg:block'>Inicio</p>
                    </li>
                </NavLink>
                <NavLink to="/app/materiales" className={({ isActive }) =>
                    isActive ? 'text-red-500' : ''
                }>
                    <li className='flex flex-row items-center gap-1'>
                        <span class="iconify mdi--tools"></span>
                        <p className='hidden md:block lg:block'>Materiales</p>
                    </li>
                </NavLink>
                <NavLink to="/app/laboratorio" class="">
                    <li className='flex flex-row items-center gap-1'>
                        <span class="iconify mdi--flask"></span>
                        <p className='hidden md:block lg:block'>Laboratorio</p>
                    </li>
                </NavLink>
                <li className='flex flex-row items-center gap-1'>
                    <span class="iconify mdi--calendar-month"></span>
                    <a href="#" class="hidden md:block lg:block">Reserva</a>
                </li>
                <NavLink to="/app/perfil" class="">
                    <li className='flex flex-row items-center gap-1'>
                        <span class="iconify mdi--person"></span>
                        <p className='hidden md:block lg:block'>Perfil</p>
                    </li>
                </NavLink>
            </ul>
        </nav>

    )
}