import { useAuth } from '../../context/AuthContext'

export default function Card_show_reserv({ id, date, usuario, horarios, onCancel }) {
    const { userData } = useAuth();
    
    return (
        <div id='container_card_show_reserv' className="w-full bg-black/70 backdrop-blur-[6px] rounded-xl p-5 flex justify-between items-center h-[15vh] min-h-[150px]">
            <section id='section_title_date' className="w-[30%] text-white flex flex-col gap-2">
                <h3 className='text-sm md:text-3xl lg:text-3xl font-bold'>Reservación</h3>
                <p className='text-[12px] md:text-[16px] lg:text-[20px]'>Fecha: {date}</p>
                <p className='text-[12px] md:text-[16px] lg:text-[20px]'>{usuario}</p>
            </section>
            <section id='section_horarios' className="w-[30%] text-white flex flex-col gap-2 overflow-y-auto h-full ">
                <div>
                    <p className="text-sm md:text-xl lg:text-2xl">Horarios: </p>
                </div>
                <div>
                    {horarios.map((horario) => (
                        <p key={`hor_${horario.nombre}`} className='text-[12px] md:text-[16px] lg:text-[20px]'>
                            Horario {horario.nombre}: {horario.inicio} - {horario.fin}
                        </p>
                    ))}
                </div>
            </section>
            <section id='section_button' className="w-[30%] flex justify-center items-center">
                {userData.rol === 'admin' &&
                    <button
                        className="bg-[#FA3E41] rounded-[20px] shadow-lg p-5 w-[80%] text-sm md:text-xl lg:text-2xl text-white flex justify-center items-center"
                        type="button"
                        onClick={() => onCancel(id)}>
                        Cancelar
                    </button>
                }
            </section>
        </div>
    );
}
