import { useAuth } from '../../context/AuthContext';

export default function Card_show_reserv({ id, subreservas, usuario, onCancel, loading }) {
    const { userData } = useAuth();

    return (
        <div id='container_card_show_reserv' className="w-full bg-black/70 backdrop-blur-[6px] rounded-xl p-5 flex justify-between items-center h-[15vh] min-h-[150px]">
            <section id='section_title_date' className="w-[30%] text-white flex flex-col gap-2">
                <h3 className='text-sm md:text-3xl lg:text-3xl font-bold'>Reserva</h3>
                <p className='text-[12px] md:text-[16px] lg:text-[20px]'>{usuario.nombre + " " +usuario.apellidos}</p>
            </section>
            <section id='section_fechas' className="w-[30%] text-white flex flex-col gap-2 overflow-y-auto h-full">
                <div>
                    <p className="text-sm md:text-xl lg:text-2xl">Fechas:</p>
                </div>
                <div>
                    {subreservas.map((subreserva) => {
                        let fechaReserva;
                        if (subreserva.fecha && typeof subreserva.fecha.toDate === "function") {
                            fechaReserva = subreserva.fecha.toDate();
                        } else {
                            fechaReserva = new Date(subreserva.fecha);
                        }
                        const fechaMostrar = isNaN(fechaReserva.getTime()) ? "Fecha inválida" : fechaReserva.toLocaleDateString();

                        return <p key={subreserva.id} className='text-[12px] md:text-[16px] lg:text-[20px]'>{fechaMostrar}</p>;
                    })}

                </div>
            </section>
            <section id='section_button' className="w-[30%] flex justify-center items-center">
                {userData.rol === 'admin' && (
                    <button
                        disabled={loading}
                        className="bg-[#FA3E41] rounded-[20px] shadow-lg p-5 w-[80%] text-sm md:text-xl lg:text-2xl text-white flex justify-center items-center transition hover:scale-110 hover:shadow-xl"
                        type="button"
                        onClick={() => onCancel(id)}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                        ) : (
                            "Cancelar"
                        )}
                    </button>
                )}
            </section>
        </div>
    );
}
