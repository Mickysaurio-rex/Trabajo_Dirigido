import Card_black_info from '../../components/home_page_components/Card_black_info';
import * as React from 'react';
import Reservation_cards_lab from '../../components/laboratory_components/Reservation_cards_lab';
import ModalReserva from '../../components/laboratory_components/modal_form_newReserv/Modal_newReserv';

export default function Info_Calendar_Page() {
    const [stateModal, setStateModal ] = React.useState(false);    
    const info_lab = {title: 'Laboratorio de Aceros', info: 'En esta sección usted tendrá la posibilidad de crear una reserva para el ambiente del laboratorio o visulaizar las fechas que ya se encuentren reservadas.'}

    return (
        <>
        <div className="flex flex-col gap-10 p-5">
            <section className='flex justify-center md:flex-row lg:flex-row md:justify-between lg:justify-between'>
                <div className='w-[90%] md:w-[40%] lg:w-[35%]'>
                    <Card_black_info tittle={info_lab.title} info={info_lab.info} />
                </div>
                <img src="/img_card_black1.jpg" className='w-[60%] h-[25vw] object-cover object-top rounded-[60px] drop-shadow-[0_5px_6px_rgba(0,0,0,0.60)] hidden md:block lg:block'></img>
            </section>
            <section className="w-full flex flex-col gap-2">
                <Reservation_cards_lab setModal={setStateModal}/>
            </section>
        </div>
        <ModalReserva stateModal={stateModal} setState={setStateModal} />
        </>
    )
}