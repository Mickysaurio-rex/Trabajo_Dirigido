import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar_input from "./Calendar_input";
import Horarios_input from "./Horarios_input";
import Confirm_modal from "./Confirm_modal";
import firebaseApp from "../../../firebase/credenciales";
import { getDocs, addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { useReservations } from "../../../context/ReservationContext";

export default function ModalReserva({ stateModal, setState, state }) {
    const { user } = useAuth();
    const { addReservation } = useReservations()
    const [step, setStep] = useState(1);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [horarios, setHorario] = useState([]);
    const [loading, setLoading] = useState(false);
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "horarios"));
                const lista = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setHorario(lista);
            } catch (error) {
                console.error("Error obteniendo materiales:", error);
            }
        };
        fetchHorarios();
    }, []);


    const handleTimeSelection = (date, horaId) => {
        setSelectedTimes((prevSelectedTimes) => {
            const newSelectedTimes = { ...prevSelectedTimes };
            if (!newSelectedTimes[date]) {
                newSelectedTimes[date] = [];
            }
            const index = newSelectedTimes[date].indexOf(horaId);
            if (index === -1) {
                newSelectedTimes[date].push(horaId);
            } else {
                newSelectedTimes[date].splice(index, 1);
            }

            return newSelectedTimes;
        });
    };

    const handleCancel = () => {
        setStep(1);
        setSelectedDates([]);
        setSelectedTimes([]);
        setState(false);
    }

    const saveReserva = async (selectedDates, selectedTimes, setState) => {
        setLoading(true);
        try{
            await addReservation(selectedDates, selectedTimes);
            setState(false);
            setLoading(false);
        }catch (error) {
            setState(false);
        }
    };
    
    useEffect(() => {
        if (state) {
            document.body.style.overflow = 'hidden'; // Bloquea el scroll
        } else {
            document.body.style.overflow = 'auto'; // Restaura el scroll
        }
    }, [state]);

    return (
        stateModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <div className="bg-white/50 backdrop-blur-[6px] p-6 rounded-[40px] shadow-lg w-[90%] md:w-[40%] md:min-w-[500px] flex flex-col justify-center items-center gap-2">
                    <h2 className="text-2xl bg-black/60 text-white font-bold w-[90%] md:w-[60%] py-4 rounded-3xl text-center">Crea tu reserva</h2>
                    {/* Paso 1: Selección de Fecha */}
                    {step === 1 && (
                        <Calendar_input setSelectedDate={setSelectedDates} selectedDate={selectedDates} />
                    )}

                    {/* Paso 2: Selección de Horario */}
                    {step === 2 && (
                        <Horarios_input horarios={horarios} selectedTimes={selectedTimes} handleTimeSelection={handleTimeSelection} selectedDates={selectedDates} />
                    )}

                    {/* Paso 3: Confirmación */}
                    {step === 3 && (
                        <Confirm_modal selectedDates={selectedDates} selectedTimes={selectedTimes} horarios={horarios} />
                    )}

                    {/* Botones de navegación */}
                    <div className="flex flex-col md:flex-row justify-between mt-6 w-[80%] gap-4 md:gap-0">
                        {step > 1 && (
                            <button disabled={loading} onClick={() => setStep(step - 1)} className="bg-[#00224E] px-4 py-2 rounded-md text-white w-full md:w-[30%] min-w-[100px] transition hover:scale-110 hover:shadow-xl">Atrás</button>
                        )}
                        <button onClick={handleCancel} className="bg-red-500 px-4 py-2 rounded-md text-white w-full md:w-[30%] transition hover:scale-110 hover:shadow-xl">Cancelar</button>
                        {step < 3 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                disabled={loading}
                                className="bg-[#F6BF41] px-4 py-2 rounded-md text-black w-full md:w-[30%] transition hover:scale-110 hover:shadow-xl"
                            >
                                Siguiente
                            </button>
                        ) : (
                            <button
                                onClick={() => { saveReserva(selectedDates, selectedTimes, setState) }}
                                disabled={loading}
                                className="bg-green-500 px-4 py-2 rounded-md text-white w-full md:w-[30%] transition hover:scale-110 hover:shadow-xl flex justify-center items-center"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                                ) : (
                                    "Aceptar"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}
