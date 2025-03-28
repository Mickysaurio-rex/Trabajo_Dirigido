import { useState } from "react";
import { useReservations } from "../../../context/ReservationContext";

export default function Card_info_reserv({ subreserva, onDelete, onUpdate }) {
    const { horarios } = useReservations(); // 🔹 Usamos horarios directamente del contexto
    const [horariosSeleccionados, setHorariosSeleccionados] = useState(subreserva.horarios || []);
    const [showDropdown, setShowDropdown] = useState(false);

    // Manejar selección de horarios
    const handleHorarioChange = (horarioId) => {
        setHorariosSeleccionados((prev) =>
            prev.includes(horarioId) ? prev.filter((id) => id !== horarioId) : [...prev, horarioId]
        );
    };

    // Guardar los cambios en los horarios
    const handleSaveChanges = () => {
        onUpdate(subreserva.id, horariosSeleccionados);
    };

    const horariosSeleccionadosNombres = horarios
    .filter((horario) => horariosSeleccionados.includes(horario.id))
    .map((horario) => horario.nombre)
    .join(", ");

    return (
        <div className="flex items-center justify-around bg-black/60 backdrop-blur-[4px] w-full min-h-[150px] px-1 md:px-5 py-6 rounded-[20px] relative">
            <section className="flex flex-col w-[25%] md:w-[30%] text-white gap-2">
                <h2 className="text-[14px] md:text-[20px] font-medium">Fecha:</h2>
                <p className="text-[16px] md:text-[22px] lg:text-[28px]">
                    {subreserva.fecha?.seconds
                        ? new Date(subreserva.fecha.seconds * 1000).toLocaleDateString()
                        : "Fecha no disponible"}
                </p>
            </section>

            <section className="flex flex-col w-[30%] gap-2 relative">
                <h2 className="text-[14px] md:text-[20px] font-medium text-white">Horarios:</h2>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full bg-[#F6BF41] text-black md:px-4 py-2 rounded-md flex justify-between items-center overflow-x-hidden"
                >
                     {horariosSeleccionadosNombres.length > 0
                        ? ` ${horariosSeleccionadosNombres}`
                        : "Seleccionar horarios"}{" "}
                    {showDropdown ? "▲" : "▼"}
                </button>

                {/* Dropdown con z-index alto */}
                {showDropdown && (
                    <div className="relative top-full left-0 w-full bg-white text-black rounded-md shadow-md mt-2 p-2 z-50">
                        {horarios.map((horario) => (
                            <label key={horario.id} className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={horario.id}
                                    checked={horariosSeleccionados.includes(horario.id)}
                                    onChange={() => handleHorarioChange(horario.id)}
                                    className="accent-black"
                                />
                                {horario.nombre} ({horario.inicio} - {horario.fin})
                            </label>
                        ))}
                    </div>
                )}
                <button
                    onClick={handleSaveChanges}
                    className="mt-2 bg-[#00224E] text-white px-4 py-2 rounded-md transition hover:scale-110"
                >
                    Guardar
                </button>
            </section>

            <section className="w-[30%] flex justify-center">
                <button
                    onClick={() => onDelete(subreserva.id)}
                    className="bg-[#FA3E41] rounded-[20px] shadow-lg p-5 w-[80%] text-sm md:text-xl lg:text-2xl text-white flex justify-center items-center transition hover:scale-110 hover:shadow-xl"
                >
                    Eliminar
                </button>
            </section>
        </div>
    );
}
