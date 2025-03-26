export default function Confirm_modal({ selectedDates, selectedTimes, horarios }) {
    return (
        <div className="text-center">
            <h2 className="text-xl font-bold">¿Estás seguro de reservar?</h2>
            <div className="mt-4 text-left">
                {selectedDates.length > 0 ? (
                    selectedDates.map((date, index) => {
                        const horariosSeleccionados = selectedTimes[date]
                            ?.map((horaId) => horarios.find((h) => h.id === horaId))
                            .filter(Boolean)
                            .sort((a, b) => a.inicio.localeCompare(b.inicio));

                        return (
                            <div key={index} className="mt-2 bg-gray-200 p-2 rounded-md">
                                <p className="font-semibold">📅 Fecha: {new Date(date).toLocaleDateString()}</p>
                                <p>
                                    🕒 Horarios:{" "}
                                    {horariosSeleccionados.length > 0 ? (
                                        horariosSeleccionados
                                            .map((h) => `${h.inicio} - ${h.fin}`)
                                            .join(", ")
                                    ) : (
                                        <span className="text-red-500">Sin horarios seleccionados</span>
                                    )}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-red-500">No se han seleccionado fechas.</p>
                )}
            </div>
        </div>
    );
}
