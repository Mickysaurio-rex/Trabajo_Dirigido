import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default function Card_selector_laboratory() {
    return (
        <NavLink to="/info_calen_lab" className="w-[95%] h-[45vh] bg-[url('./public/img_card_selc_lab.jpg')] bg-cover p-5 md:py-10 md:px-16 lg:py-10 lg:px-16 rounded-[40px]">
            <div class="">
                <h5 class="mb-2 text-[48px] font-bold text-white">Laboratorio de Aceros</h5>
                <p class="mb-5 text-white text-[24px">Campus Fernando Illanes de la Riva</p>
            </div>
        </NavLink>
    )

}