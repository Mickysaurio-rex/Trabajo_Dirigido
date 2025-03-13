import { useState, useEffect } from "react";
import { getDocs, collection, getFirestore, doc, getDoc } from "firebase/firestore";
import Selector_date_lab from '../../components/laboratory_components/Selector_date_lab';
import Card_show_reserv from '../laboratory_components/Card_show_reserv';
import firebaseApp from "../../firebase/credenciales";

export default function Reservation_cards_lab({ setModal }) {
    const [reservaciones, setReservaciones] = useState([]);
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        const fetchReservaciones = async () => {
            try {
                const reservasSnapshot = await getDocs(collection(firestore, "reservaLab"));
                const reservas = reservasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const horariosSnapshot = await getDocs(collection(firestore, "horarios"));
                const horariosMap = horariosSnapshot.docs.reduce((acc, doc) => {
                    acc[doc.id] = { id: doc.id, ...doc.data() };
                    return acc;
                }, {});

                const reservasConDatos = await Promise.all(reservas.map(async (reserva) => {
                    // Obtener el nombre del usuario usando su ID
                    const userDoc = await getDoc(doc(firestore, "usuarios", reserva.usuario));
                    const nombreUsuario = userDoc.exists() ? userDoc.data().nombre : "Desconocido";

                    // Obtener los horarios con información completa
                    const horariosCompletos = reserva.horarios
                        .map(id => horariosMap[id])
                        .filter(horario => horario !== undefined);

                    return {
                        ...reserva,
                        usuario: nombreUsuario,
                        horarios: horariosCompletos,
                    };
                }));

                setReservaciones(reservasConDatos);
            } catch (error) {
                console.error("Error obteniendo reservas:", error);
            }
        };

        fetchReservaciones();
    }, []);

    return (
        <div id='container_cards_reserv' className="flex flex-col w-full min-h-[200px] gap-2">
            <section id='section_title' className="w-full h-[12vh] min-h-[90px] bg-black/70 flex justify-center items-center rounded-xl backdrop-blur-[5px]">
                <h2 id="title_reserv_lab" className="text-white text-xl md:text-3xl lg:text-5xl font-bold"> Reservaciones del laboratorio </h2>
            </section>
            <section className="flex flex-col md:flex-row lg:flex-row gap-5">
                <Selector_date_lab />
                <div className='w-full md:w-[40%] lg:w-[40%] flex justify-center items-center'>
                    <button 
                        onClick={() => setModal(true)}
                        className='w-[90%] bg-[#F6BF41] min-h-[50px] h-[5vh] md:h-[90%] lg:h-[90%] rounded-[20px] font-medium text-[16px] md:text-[20px] lg:text-[22px]'>
                        Crear Reserva
                    </button>
                </div>
            </section>
            <section className='flex flex-col gap-2'>
                {reservaciones.map((reservacion, index) => (
                    <Card_show_reserv 
                        key={index} 
                        date={reservacion.fecha.toDate().toLocaleDateString()} 
                        usuario={reservacion.usuario} 
                        horarios={reservacion.horarios}
                    />
                ))}
            </section>
        </div>
    );
}
