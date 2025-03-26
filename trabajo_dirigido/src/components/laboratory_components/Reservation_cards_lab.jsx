import { useState, useEffect } from "react";
import Selector_date_lab from '../../components/laboratory_components/Selector_date_lab';
import Card_show_reserv from '../laboratory_components/Card_show_reserv';
import { useReservations } from "../../context/ReservationContext";

export default function Reservation_cards_lab({ setModal }) {
    const { reservations, loading, deleteReservation } = useReservations();
    const [filteredReservaciones, setFilteredReservaciones] = useState([]);
    const [selectedDate, setSelectedDate] = useState({ month: "", day: "" });

    useEffect(() => {
        const filtered = reservations.filter(reserva => 
            reserva.subreservas.some(sub => {
                let reservaDate;
                if (sub.fecha && typeof sub.fecha.toDate === "function") {
                    reservaDate = sub.fecha.toDate(); // Convierte Timestamp a Date
                } else {
                    reservaDate = new Date(sub.fecha); // Para fechas en formato string
                }
                // Si la fecha sigue siendo inválida, omitir
                if (isNaN(reservaDate.getTime())) return false;
                const reservaMonth = reservaDate.getMonth();
                const reservaDay = reservaDate.getDate();
                const matchMonth = selectedDate.month === "" || reservaMonth === Number(selectedDate.month);
                const matchDay = selectedDate.day === "" || reservaDay === Number(selectedDate.day);
    
                return matchMonth && matchDay;
            })
        ).sort((a, b) => {
            const dateA = new Date(a.subreservas[0]?.fecha);
            const dateB = new Date(b.subreservas[0]?.fecha);
            return dateA - dateB;
        });
    
        setFilteredReservaciones(filtered);
    }, [selectedDate, reservations]);
    

    return (
        <div id='container_cards_reserv' className="flex flex-col w-full min-h-[200px] gap-2">
            <section id='section_title' className="w-full h-[12vh] min-h-[90px] bg-black/70 flex justify-center items-center rounded-xl backdrop-blur-[5px]">
                <h2 id="title_reserv_lab" className="text-white text-xl md:text-3xl lg:text-5xl font-bold"> Reservaciones del laboratorio </h2>
            </section>
            <section className="flex flex-col md:flex-row lg:flex-row gap-5">
                <Selector_date_lab setSelectedDate={setSelectedDate} />
                <div className='w-full md:w-[40%] lg:w-[40%] flex justify-center items-center'>
                    <button 
                        onClick={() => setModal(true)}
                        className='w-[90%] bg-[#F6BF41] min-h-[50px] h-[5vh] md:h-[90%] lg:h-[90%] rounded-[20px] font-medium text-[16px] md:text-[20px] lg:text-[22px] transition hover:scale-110 hover:shadow-xl'>
                        Crear Reserva
                    </button>
                </div>
            </section>
            <section className='flex flex-col gap-2'>
                {filteredReservaciones.map((reservacion) => (
                    <Card_show_reserv 
                        key={reservacion.id} 
                        id={reservacion.id}
                        subreservas={reservacion.subreservas}
                        usuario={reservacion.usuario}
                        onCancel={deleteReservation}
                        loading={loading}
                    />
                ))}
            </section>
        </div>
    );
}
