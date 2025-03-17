import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar_input from "./Calendar_input";
import Horarios_input from "./Horarios_input";
import Confirm_modal from "./Confirm_modal";
import { useReserva } from "../../../context/ReservaContext";

export default function ModalSelectDate({ stateModal, setState, selectedDate, selectedTimes, setSelectedDate, setSelectedTimes, horarios, handleCancel }) {
    const [step, setStep] = useState(1);
    const { reserva, setReserva } = useReserva();

    const handleTimeSelection = (id) => {
        setReserva((prev) => ({
            ...prev,
            horarios: prev.horarios.includes(id)?
            prev.horarios.filter((t) => t !== id):
            [...prev.horarios, id]
        }))
    };


    return (
        stateModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                <div className="bg-white/50 backdrop-blur-[6px] p-6 rounded-[40px] shadow-lg w-[90%] md:w-[40%] flex flex-col justify-center items-center gap-2">
                    <h2 className="text-2xl bg-black/60 text-white font-bold w-[60%] py-4 rounded-3xl text-center">Selecciona tu fecha</h2>
                    {/* Paso 1: Selección de Fecha */}
                    {step === 1 && (
                        <Calendar_input setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
                    )}

                    {/* Paso 2: Selección de Horario */}
                    {step === 2 && (
                        <Horarios_input horarios={horarios} selectedTimes={selectedTimes} handleTimeSelection={handleTimeSelection} />
                    )}

                    {/* Paso 3: Confirmación */}
                    {step === 3 && (
                        <Confirm_modal selectedDate={selectedDate} selectedTimes={selectedTimes}/>
                    )}

                    {/* Botones de navegación */}
                    <div className="flex justify-between mt-6 w-[60%]">
                        {step > 1 && (
                            <button onClick={() => setStep(step - 1)} className="bg-[#00224E] px-4 py-2 rounded-md text-white w-[30%]">Atrás</button>
                        )}
                        <button onClick={() => {handleCancel(); setStep(1);}} className="bg-red-500 px-4 py-2 rounded-md text-white w-[30%]">Cancelar</button>
                        {step < 3 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="bg-[#F6BF41] px-4 py-2 rounded-md text-black w-[30%]"
                            >
                                Siguiente
                            </button>
                        ) : (
                            <button
                            onClick={() => {
                                console.log(selectedDate);
                                console.log(selectedTimes);
                                setState(false); // Cerrar modal después de aceptar
                                setStep(1); 
                                 }}
                                className="bg-green-500 px-4 py-2 rounded-md text-white w-[30%]"
                            >
                                Aceptar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}
