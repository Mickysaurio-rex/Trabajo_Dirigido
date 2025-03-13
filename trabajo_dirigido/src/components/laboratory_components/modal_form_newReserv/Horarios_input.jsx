export default function Horarios_input({horarios, selectedTimes, handleTimeSelection}) {
    return(
    <div className="text-center w-[80%] flex flex-col items-center">
        <h2 className="text-xl font-medium bg-black/60 text-white w-[60%] py-4 rounded-3xl text-center">Selecciona un Horario</h2>
        <div className="flex flex-col items-center bg-[#F6BF41] mt-4 w-[80%] py-5 rounded-xl">
            {horarios.map((hora) =>

            (
                <label key={hora.id} className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        value={hora.id}
                        checked={selectedTimes.includes(hora.id)}
                        onChange={() => handleTimeSelection(hora.id)}
                    />
                    {"Horario " + hora.nombre + ": " + hora.inicio + " - " + hora.fin}
                </label>
            ))}
        </div>
    </div>
    )
}