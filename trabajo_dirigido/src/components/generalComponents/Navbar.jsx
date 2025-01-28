import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav class="bg-black rounded-3xl h-[8vh] text-white  place-content-center">
            <ul class="font-bold flex flex-row justify-around"> 
                <li className='flex flex-row items-center gap-1'>
                    <span class="iconify mdi--home"></span>
                    <NavLink to="/"  className={({ isActive }) =>
              isActive ? 'text-red-500' : ''
            } aria-current="page">Inicio</NavLink>
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
                    <NavLink to="perfil" class="">Perfil</NavLink>
                </li>
            </ul>
        </nav>

    )
}