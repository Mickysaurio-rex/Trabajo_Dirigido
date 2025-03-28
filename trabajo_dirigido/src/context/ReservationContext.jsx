import { createContext, useContext, useEffect, useState } from "react";
import { getDocs, addDoc, deleteDoc, collection, getFirestore, doc, query, where, getDoc, updateDoc } from "firebase/firestore";
import firebaseApp from "../firebase/credenciales";
import { useAuth } from "./AuthContext"; // Para manejar el usuario actual

const firestore = getFirestore(firebaseApp);
const ReservationContext = createContext();

export function ReservationProvider({ children }) {
    const { user } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [horarios, setHorarios] = useState([]); 
    const [loading, setLoading] = useState(false);

    // 🔄 Cargar reservas, subreservas y datos de usuario desde Firebase
    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const reservasSnapshot = await getDocs(collection(firestore, "reservaLab"));
                const reservas = reservasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const subReservasSnapshot = await getDocs(collection(firestore, "subreservaLab"));
                const subReservas = subReservasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Obtener información de los usuarios
                const uniqueUserIds = [...new Set(reservas.map(reserva => reserva.usuario))];
                const userDocs = await Promise.all(
                    uniqueUserIds.map(async (userId) => {
                        const userDoc = await getDoc(doc(firestore, "usuarios", userId));
                        return userDoc.exists() ? { id: userId, ...userDoc.data() } : { id: userId, nombre: "Desconocido" };
                    })
                );

                // Crear un diccionario de usuarios para acceso rápido
                const userMap = userDocs.reduce((acc, userData) => {
                    acc[userData.id] = userData;
                    return acc;
                }, {});

                // Asociar subreservas y datos del usuario a las reservas principales
                const reservasConDatos = reservas.map(reserva => ({
                    ...reserva,
                    usuario: userMap[reserva.usuario] || { nombre: "Desconocido" },
                    subreservas: subReservas.filter(sub => sub.reservaId === reserva.id),
                }));

                setReservations(reservasConDatos);
            } catch (error) {
                console.error("Error obteniendo reservas:", error);
            }
            setLoading(false);
        };

        fetchReservations();
        getHorarios();
    }, []);

    // 🔹 Función para obtener los horarios de Firebase
    async function getHorarios() {
        try {
            const horariosRef = collection(firestore, "horarios");
            const horariosSnapshot = await getDocs(horariosRef);
            const horariosData = horariosSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHorarios(horariosData);
        } catch (error) {
            console.error("Error al obtener horarios:", error);
        }
    }

    // Obtener reserva por ID
    const getReservaById = (id) => {
        return reservations.find(reserva => reserva.id === id);
    };

    // Obtener subreservas por ID de reserva
    const getSubreservasByReservaId = (id) => {
        const reserva = getReservaById(id);
        return reserva ? reserva.subreservas : [];
    };

    const addReservation = async (selectedDates, selectedTimes) => {
        if (!user) return;
        setLoading(true);
        try {
            // Guardar la reserva principal
            const reservaRef = await addDoc(collection(firestore, "reservaLab"), {
                usuario: user.uid,
            });

            // Guardar las subreservas con las fechas y horarios seleccionados
            for (const date of selectedDates) {
                await addDoc(collection(firestore, "subreservaLab"), {
                    reservaId: reservaRef.id,
                    fecha: date,
                    horarios: selectedTimes[date] || [],
                });
            }

            // Obtener datos del usuario actual
            const userDoc = await getDoc(doc(firestore, "usuarios", user.uid));
            const userData = userDoc.exists() ? userDoc.data() : { nombre: "Desconocido" };

            // Actualizar estado con la nueva reserva
            setReservations(prev => [
                ...prev,
                {
                    id: reservaRef.id,
                    usuario: { id: user.uid, ...userData },
                    subreservas: selectedDates.map(date => ({
                        fecha: date,
                        horarios: selectedTimes[date] || [],
                    })),
                },
            ]);
            alert("Reserva guardada exitosamente");
        } catch (error) {
            alert("Error al guardar la reserva");
        }
        setLoading(false);
    };

    const deleteReservation = async (reservaId) => {
        setLoading(true);
        try {
            // Eliminar subreservas asociadas
            const subreservasQuery = query(collection(firestore, "subreservaLab"), where("reservaId", "==", reservaId));
            const subreservasSnapshot = await getDocs(subreservasQuery);
            subreservasSnapshot.forEach(async (docSnap) => {
                await deleteDoc(doc(firestore, "subreservaLab", docSnap.id));
            });

            // Eliminar la reserva principal
            await deleteDoc(doc(firestore, "reservaLab", reservaId));

            // Actualizar estado
            setReservations(prev => prev.filter(reserva => reserva.id !== reservaId));
        } catch (error) {
            console.error("Error eliminando la reserva:", error);
        }
        setLoading(false);
    };

    // 🔹 Eliminar una subreserva
    const deleteSubreserva = async (subreservaId) => {
        setLoading(true);
        try {
            // Eliminar la subreserva de Firebase
            await deleteDoc(doc(firestore, "subreservaLab", subreservaId));

            // Actualizar el estado de las reservas, eliminando la subreserva correspondiente
            setReservations(prevReservations =>
                prevReservations.map(reserva => ({
                    ...reserva,
                    subreservas: reserva.subreservas.filter(sub => sub.id !== subreservaId),
                }))
            );
        } catch (error) {
            console.error("Error eliminando la subreserva:", error);
        }
        setLoading(false);
    };

    // 🔹 Actualizar una subreserva (horarios)
    const updateSubreserva = async (subreservaId, horariosSeleccionados) => {
        setLoading(true);
        try {
            // Obtener la subreserva
            const subreservaRef = doc(firestore, "subreservaLab", subreservaId);
            
            // Actualizar los horarios de la subreserva
            await updateDoc(subreservaRef, {
                horarios: horariosSeleccionados,
            });

            // Actualizar el estado local
            setReservations(prevReservations =>
                prevReservations.map(reserva => ({
                    ...reserva,
                    subreservas: reserva.subreservas.map(sub => 
                        sub.id === subreservaId ? { ...sub, horarios: horariosSeleccionados } : sub
                    ),
                }))
            );
        } catch (error) {
            console.error("Error actualizando la subreserva:", error);
        }
        setLoading(false);
    };

    return (
        <ReservationContext.Provider value={{
            reservations,
            horarios,
            getHorarios,
            addReservation,
            deleteReservation,
            deleteSubreserva, 
            updateSubreserva, 
            getReservaById,
            getSubreservasByReservaId,
            loading
        }}>
            {children}
        </ReservationContext.Provider>
    );
}

export function useReservations() {
    return useContext(ReservationContext);
}
