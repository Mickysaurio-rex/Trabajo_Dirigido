import { useParams, useNavigate } from "react-router-dom";
import { useReservations } from "../../context/ReservationContext";
import Card_info_reserv from "../../components/laboratory_components/card_info_reserv/Card_info_reserv";

export default function Reserva_info_page() {
    const { id } = useParams(); // Obtenemos el id de la reserva desde la URL
    const navigate = useNavigate();
    const { getReservaById, getSubreservasByReservaId, updateSubreserva, deleteSubreserva, loading } = useReservations();
    
    // Obtenemos la reserva y sus subreservas usando los métodos del contexto
    const reserva = getReservaById(id);
    const subreservas = getSubreservasByReservaId(id);


    const handleBack = () => {
        navigate("../laboratorio_info");
    };

    const handleSave = () => {
        alert("Cambios guardados!");
    };

    // Eliminar una subreserva
    const handleDeleteSubreserva = async (subreservaId) => {
        await deleteSubreserva(subreservaId);
    };

    // Actualizar los horarios de una subreserva
    const handleUpdateSubreserva = async (subreservaId, nuevosHorarios) => {
        await updateSubreserva(subreservaId, { horarios: nuevosHorarios });
    };

    return (
        <div className="flex flex-col gap-5 w-full min-h-[500px] px-2 md:px-10">
            <header className="flex flex-col gap-2 bg-black/60 rounded-[30px] md:w-[50vw] h-[15%] min-h-[150px] backdrop-blur-sm p-5 place-content-center">
                <h1 className="text-[30px] md:text-[30px] lg:text-[50px] text-center md:text-start lg:text-start font-bold text-white">
                    Información de la Reserva
                </h1>
                <p className="text-[20px] md:text-[20px] lg:text-[30px] text-center md:text-start lg:text-start text-white">
                    Modifica los horarios o cancela el día que no vayas a necesitar
                </p>
            </header>
            
            <section className='flex justify-center md:justify-end gap-5 md:w-full'>
                <button
                    onClick={handleSave}
                    className="w-[40%] md:w-[20%] bg-[#00224E] min-h-[50px] h-[5vh] md:h-[90%] lg:h-[90%] rounded-[20px] font-medium text-white text-[16px] md:text-[20px] lg:text-[22px] transition hover:scale-110 hover:shadow-xl"
                >
                    Guardar
                </button>
                <button
                    onClick={handleBack}
                    className="w-[40%] md:w-[20%] bg-[#F6BF41] min-h-[50px] h-[5vh] md:h-[90%] lg:h-[90%] rounded-[20px] font-medium text-[16px] md:text-[20px] lg:text-[22px] transition hover:scale-110 hover:shadow-xl"
                >
                    Volver Atrás
                </button>
            </section>

            <section className="w-full flex flex-col gap-5">
                {subreservas && subreservas.length > 0 ? (
                    subreservas.map((subreserva) => (
                        <Card_info_reserv 
                            key={subreserva.id} 
                            subreserva={subreserva} 
                            onDelete={handleDeleteSubreserva} 
                            onUpdate={handleUpdateSubreserva} 
                        />
                    ))
                ) : (
                    <p className="text-white text-center">No hay subreservas para esta reserva.</p>
                )}
            </section>
        </div>
    );
}
