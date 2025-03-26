import React, { useState, useEffect } from "react";

export default function Horarios_input({ horarios, selectedTimes, handleTimeSelection, selectedDates }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedHoursForDate, setSelectedHoursForDate] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            setSelectedHoursForDate(selectedTimes[selectedDate] || []);
        }
    }, [selectedDate, selectedTimes]);

    const handleCheckboxChange = (horaId) => {
        handleTimeSelection(selectedDate, horaId);
    };

    return (
        <div className="text-center w-[95%] md:w-[80%] flex flex-col items-center">
            <h2 className="text-xl font-medium bg-black/60 text-white w-[80%] md:w-[60%] py-4 rounded-3xl text-center">
                Selecciona un Horario
            </h2>
            {/* Dropdown de fechas */}
            <div className="mb-4">
                <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-[#F6BF41] text-black px-4 py-2 rounded-md"
                >
                    <option value="">Selecciona una fecha</option>
                    {selectedDates.map((date, index) => (
                        <option key={index} value={date}>
                            {new Date(date).toLocaleDateString()} {/* Formatea la fecha */}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mostramos los horarios solo si se seleccionó una fecha */}
            {selectedDate && (
                <div className="flex flex-col items-center bg-[#F6BF41] w-[90%] md:w-[80%] mt-4 py-5 rounded-xl">
                    {horarios.map((hora) => (
                        <label key={hora.id} className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                value={hora.id}
                                checked={selectedHoursForDate.includes(hora.id)}
                                onChange={() => handleCheckboxChange(hora.id)}
                            />
                            {"Horario " + hora.nombre + ": " + hora.inicio + " - " + hora.fin}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
