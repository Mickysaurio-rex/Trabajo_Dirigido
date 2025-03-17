import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-black rounded-3xl h-[8vh] text-white flex min-h-[70px] m-5">
            <ul className="font-bold flex flex-row justify-around w-full items-center">
                {[
                    { path: "/app", icon: "mdi--home", label: "Inicio" },
                    { path: "/app/materiales", icon: "mdi--tools", label: "Materiales" },
                    { path: "/app/laboratorio", icon: "mdi--flask", label: "Laboratorio" },
                    { path: "/app/reserva", icon: "mdi--calendar-month", label: "Reserva" },
                    { path: "/app/perfil", icon: "mdi--person", label: "Perfil" }
                ].map(({ path, icon, label }) => (
                    <li key={path}>
                        <NavLink
                            to={path}
                            end
                            className={({ isActive }) =>
                                `flex flex-row items-center gap-1 transition-all
                                ${isActive ? "bg-yellow-400 text-white text-[20px] font-bold rounded-[40px] py-4 px-10" : "text-white"}`
                            }
                        >
                            <span className={`iconify ${icon}`} />
                            <p className="hidden md:block lg:block ">{label}</p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}