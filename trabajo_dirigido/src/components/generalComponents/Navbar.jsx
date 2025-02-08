import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const selector = (isActive) => {
        isActive ? 'text-red-500' : ''
    }

    return (
        <nav class="bg-black rounded-3xl h-[8vh] text-white  place-content-center min-h-[70px]">
            <ul class="font-bold flex flex-row justify-around"> 
                <li className={`flex flex-row items-center gap-1 ${selector}`}>
                    <span class="iconify mdi--home"></span>
                    <NavLink to="/" >Inicio</NavLink>
                </li>
                <li className='flex flex-row items-center gap-1'>
                <span class="iconify mdi--tools"></span>
                    <NavLink to="/materiales"  className={({ isActive }) =>
              isActive ? 'text-red-500' : ''
            }>Materiales</NavLink>
                </li>
                <li className='flex flex-row items-center gap-1'>
                <span class="iconify mdi--flask"></span>
                    <NavLink to="/laboratorios" class="">Laboratorios</NavLink>
                </li>
                <li className='flex flex-row items-center gap-1'>
                <span class="iconify mdi--calendar-month"></span>
                    <a href="#" class="">Reserva</a>
                </li>
                <li className='flex flex-row items-center gap-1'>
                <span class="iconify mdi--person"></span>
                    <NavLink to="/perfil" class="">Perfil</NavLink>
                </li>
            </ul>
        </nav>

    )
}