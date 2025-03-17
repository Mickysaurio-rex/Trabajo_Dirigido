import React, { useState, useEffect } from "react";
import firebaseApp from "../../firebase/credenciales";
import { getDocs, addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useReserva } from "../../context/ReservaContext";
import Modal_selectDate from "../../components/reserv_components/modal_form_newReserv/Modal_selectDate"
import Card_show_material from "../../components/reserv_components/Card_show_material";

export default function New_reserv_page() {
    const [stateModal, setStateModal] = useState(false);
    const navigate = useNavigate();
    const firestore = getFirestore(firebaseApp);

    const { reserva, setReserva } = useReserva();
    const { user } = useAuth();

    const [horarios, setHorario] = useState([]);

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "horarios"));
                const lista = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setHorario(lista);
                console.log(reserva.materiales);
                
            } catch (error) {
                console.error("Error obteniendo horarios:", error);
            }
        };
        fetchHorarios();
    }, []);

    const handleCancel=() => {
        setReserva(
            {
                fecha:null,
                horarios: [],
                materiales: []
            })
        navigate("../reserva");
    }

    const handleFinalizar = async () => {
        if (!reserva.fecha || reserva.horarios.length === 0 || reserva.materiales.length === 0) {
            alert("Por favor, selecciona la fecha, los horarios y los materiales.");
            return;
        }

        try {
            const materialesIds = reserva.materiales.map(material => material.id);

            const reservaRef = await addDoc(collection(firestore, "reservas"), {
                fecha: reserva.fecha,
                horarios: reserva.horarios,
                materiales: materialesIds,
                usuarioUid: user.uid,
                createdAt: Timestamp.now(),
            });
            alert("Reserva creada exitosamente");
            setReserva(
                {
                    fecha:null,
                    horarios: [],
                    materiales: []
                }
            )
            navigate('../reserva')
        } catch (error) {
            console.error("Error creando la reserva: ", error);
        }
    };

    return (
        <>
            <div className="px-10 flex flex-col gap-5">
                <header className="flex justify-around w-full">
                    <article
                        onClick={() => setStateModal(true)}
                        className="flex items-center bg-black/70 backdrop-blur-[6px] text-white text-[20px] p-10 rounded-xl gap-8">
                        <span className="iconify mdi--calendar-blank scale-150" ></span>
                        <p>
                            Fecha: {reserva.fecha ? new Date(reserva.fecha).toLocaleDateString() : "No seleccionada"}
                        </p>
                        <p>Horarios: {reserva.horarios.length ?  horarios.filter(h => reserva.horarios.includes(h.id)) .map(h => h.nombre).join(" , ") : "No seleccionados"}</p>
                    </article>
                    <section className="flex items-center gap-10 w-[40%]">
                        <button
                            onClick={handleFinalizar}
                            className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg md:w-[40%] lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'
                        > Finalizar </button>
                        {reserva.fecha && (
                            <button
                        onClick={() => navigate('../nv_reserv_materials')}
                            className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#F6BF41] rounded-[20px] shadow-lg md:w-[40%] lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'
                        > Seleccionar </button>)}
                        <button
                        onClick={() => navigate('../reserva')}
                            className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#FA3E41] rounded-[20px] shadow-lg md:w-[40%] lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'
                        > Cancelar </button>
                    </section>
                </header>
                <section className="min-h-screen flex flex-col gap-5">
                    {reserva.materiales.map((material) => (
                        <Card_show_material material={material} />
                    ))
                    }
                </section>
            </div>
            <Modal_selectDate stateModal={stateModal} setState={setStateModal} selectedDate={reserva.fecha} selectedTimes={reserva.horarios} setSelectedDate={(date) => setReserva({...reserva, fecha: date})} setSelectedTimes={(times) => setReserva({...reserva, horarios: times})} horarios={horarios} handleCancel={() => {setReserva({ ...reserva, fecha: null, horarios: [] }); setStateModal(false)}} />
        </>
    )
}