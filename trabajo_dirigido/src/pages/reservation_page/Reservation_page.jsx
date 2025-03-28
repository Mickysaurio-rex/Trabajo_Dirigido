import * as React from 'react'
import Card_info_resv from '../../components/generalComponents/Card_info_resv';
import { useNavigate } from 'react-router-dom';
import firebaseApp from "../../firebase/credenciales";
import { getDocs, addDoc, collection, getFirestore, Timestamp, deleteDoc, doc } from "firebase/firestore";
import Selector_date_lab from '../../components/laboratory_components/Selector_date_lab';

export default function Reservation_page(){
  const [reservas, setReservas] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const firestore = getFirestore(firebaseApp);
  const [selectedDate, setSelectedDate] = React.useState({ month: "", day: "" });
  const [filteredReservaciones, setFilteredReservaciones] = React.useState([]);

  React.useEffect(() => {
    const fetchreservas = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "reservas"));
            const lista = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setReservas(lista);
            console.log(reservas);
            
        } catch (error) {
            console.error("Error obteniendo reservas:", error);
        }
    };
    fetchreservas();
}, []); 
React.useEffect(() => {
        const filtered = reservas.filter(reserva => {
            const reservaDate = reserva.fecha.toDate();
            const reservaMonth = reservaDate.getMonth();
            const reservaDay = reservaDate.getDate();

            const matchMonth = selectedDate.month === "" || reservaMonth === Number(selectedDate.month);
            const matchDay = selectedDate.day === "" || reservaDay === Number(selectedDate.day);

            return matchMonth && matchDay;
        }).sort((a, b) => a.fecha.toDate() - b.fecha.toDate());
        
        setFilteredReservaciones(filtered);
    }, [selectedDate, reservas]);

    const handleCancelReservation = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(firestore, "reservas", id));
            setReservas(prev => prev.filter(reserva => reserva.id !== id));
            setLoading(false)
        } catch (error) {
            console.error("Error al cancelar la reserva:", error);
        }
    };
  
const navigation = useNavigate();
    return (
        <div className='min-h-screen p-10 flex flex-col gap-10'>
            <header className='bg-black/60 rounded-[30px] md:w-[30vw] lg:w-[30vw] max-w-[400px] h-[15%] min-h-[100px] backdrop-blur-sm p-5 place-content-center'>
                <h2    
                className='text-[30px] md:text-[30px] lg:text-[50px] text-center md:text-start lg:text-start font-bold text-white'>Tus Reservas</h2>
            </header>
            <section className='w-full flex flex-col gap-5 justify-between items-center h-[15%]'>
                <div className='flex flex-col gap-5 w-full'>
                    <Selector_date_lab setSelectedDate={setSelectedDate}/>
                </div>
                <button 
                onClick={() => navigation("../nueva_reserva")}
                className='bg-[#F6BF41] text-black rounded-[20px] text-[16px] lg:text-[24px] font-semibold h-[10vh] w-[15vw] min-h-[80px] min-w-[150px] transition hover:scale-110 hover:shadow-xl'>Crear Reserva</button>
            </section>
            <section className='h-[55%] flex flex-col gap-5'>
                {filteredReservaciones.map((reserva) => (
                  <Card_info_resv event={reserva} handleCancel={handleCancelReservation} loading={loading}/>
                ))}
            </section>
        </div>
    )
}