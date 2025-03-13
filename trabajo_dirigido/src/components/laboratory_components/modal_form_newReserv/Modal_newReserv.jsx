import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar_input from "./Calendar_input";
import Horarios_input from "./Horarios_input";
import Confirm_modal from "./Confirm_modal";
import firebaseApp from "../../../firebase/credenciales";
import { getDocs,addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";

export default function ModalReserva({ stateModal, setState }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [horarios, setHorario] = useState([]);
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

        const handleTimeSelection = (id) => {
            setSelectedTimes((prev) =>
                prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
            );
        };

    const handleCancel = () => {
        setStep(1);
        setSelectedDate(null);
        setSelectedTimes([]);
        setState(false);
    }

    const saveReserva = async (selectedDate, selectedTimes, setState) => {
        try {
            if (!selectedDate || selectedTimes.length === 0) {
                console.error("Datos incompletos para la reserva");
                return;
            }
            // Convertir la fecha seleccionada a Timestamp
            const fechaReserva = Timestamp.fromDate(selectedDate);
            // Ordenar los horarios seleccionados por ID antes de guardar
            const horariosSeleccionados = [...selectedTimes].sort((a, b) => a - b);
            console.log({
                usuario: user.uid, // Guardar UID del usuario
                fecha: fechaReserva,
                horarios: horariosSeleccionados,
                estado: "Aceptado"
            });
            // Guardar en Firestore
            await addDoc(collection(firestore, "reservaLab"), {
                usuario: user.uid, // Guardar UID del usuario
                fecha: fechaReserva,
                horarios: horariosSeleccionados,
                estado: "Aceptado"
            });
           
            console.log("Reserva guardada correctamente");
            setState(false); // Cerrar el modal después de guardar
        } catch (error) {
            console.error("Error guardando la reserva:", error);
        }
    };
    return (
        stateModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                <div className="bg-white/50 backdrop-blur-[6px] p-6 rounded-[40px] shadow-lg w-[90%] md:w-[40%] flex flex-col justify-center items-center gap-2">
                    <h2 className="text-2xl bg-black/60 text-white font-bold w-[60%] py-4 rounded-3xl text-center">Crea tu reserva</h2>
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
                        <button onClick={handleCancel} className="bg-red-500 px-4 py-2 rounded-md text-white w-[30%]">Cancelar</button>
                        {step < 3 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="bg-[#F6BF41] px-4 py-2 rounded-md text-black w-[30%]"
                            >
                                Siguiente
                            </button>
                        ) : (
                            <button
                                onClick={() => { saveReserva(selectedDate, selectedTimes, setState) }}
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
