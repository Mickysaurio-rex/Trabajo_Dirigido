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
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            const materialesIds = reserva.materiales.map(material => material.id);

            const reservaRef = await addDoc(collection(firestore, "reservas"), {
                fecha: reserva.fecha,
                horarios: reserva.horarios,
                materiales: materialesIds,
                usuarioUid: user.uid,
                createdAt: Timestamp.now(),
            });
            setLoading(false)
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
            <div className="px-2 md:px-6 lg:px-10 flex flex-col gap-5">
                <header className="flex flex-col md:flex-row justify-around items-center w-full gap-5">
                    <article
                        onClick={() => setStateModal(true)}
                        className="flex justify-between items-center bg-black/70 backdrop-blur-[6px] text-white text-[14px] md:text-[16px] lg:text-[20px] p-4 md:p-6 lg:p-10 rounded-xl gap-8 w-full md:w-[50%]">
                        <span className="iconify mdi--calendar-blank scale-150 w-[15%]" ></span>
                        <p className="w-[30%]">
                            Fecha: {reserva.fecha ? new Date(reserva.fecha).toLocaleDateString() : "No seleccionada"}
                        </p>
                        <p className="w-[30%]">Horarios: {reserva.horarios.length ?  horarios.filter(h => reserva.horarios.includes(h.id)) .map(h => h.nombre).join(" , ") : "No seleccionados"}</p>
                    </article>
                    <section className="flex flex-col lg:flex-row items-center gap-2 w-[90%] md:w-[45%]">
                        <button
                        disabled={loading}
                            onClick={handleFinalizar}
                            className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg w-full lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white flex justify-center items-center'
                        > {loading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                        ) : (
                            "Finalizar"
                        )} </button>
                        {reserva.fecha && (
                            <button
                            disabled={loading}
                        onClick={() => navigate('../nv_reserv_materials')}
                            className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#F6BF41] rounded-[20px] shadow-lg w-full lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'
                        > Seleccionar </button>)}
                        <button
                        disabled={loading}
                        onClick={handleCancel}
                            className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#FA3E41] rounded-[20px] shadow-lg w-full lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'
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