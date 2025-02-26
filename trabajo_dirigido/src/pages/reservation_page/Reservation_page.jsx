import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Card_info_resv from '../../components/generalComponents/Card_info_resv';

const datePickerStyles = {
    "& .MuiInputBase-root": {
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Fondo negro con opacidad
      backdropFilter: "blur(5px)", // Efecto de blur
      borderRadius: "10px",
      height:'10vh',
      width: 'full',
      minWidth:'150px',
      minHeight:'80px'
    },
    "& .MuiInputBase-input": {
      color: "white", // Color del texto dentro del input
      fontSize: '20px'
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white", // Borde blanco al pasar el mouse
    },
    "& .MuiInputLabel-root": {
      color: "white", // Color del label
      fontSize: '20px',
      fontWeight: 'bold'
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white", // Color del label cuando está enfocado
    },
    "& .MuiSvgIcon-root": {
      color: "white", // Color del icono de calendario
      scale:'1.3'
    },
  };

  const events = [
    { name: "Evento 1", date_s: "2025/03/10", date_f: "2025/03/12", state: 'Aprobado' },
    { name: "Evento 2", date_s: "2025-04-05", date_f: "2025-04-07", state: 'En aprobación' },
    { name: "Evento 3", date_s: "2025-05-20", date_f: "2025-05-22", state: 'Cancelado' },
    { name: "Evento 4", date_s: "2025-06-15", date_f: "2025-06-18", state: 'Cancelado' },
    { name: "Evento 5", date_s: "2025-07-01", date_f: "2025-07-03", state: 'Aprobado' }
  ];

export default function Reservation_page() {
    return (
        <div className='min-h-screen p-10 flex flex-col gap-10'>
            <header className='bg-black/60 rounded-[30px] md:w-[30vw] lg:w-[30vw] max-w-[400px] h-[15%] min-h-[100px] backdrop-blur-sm p-5 place-content-center'>
                <h2 className='text-[30px] md:text-[30px] lg:text-[50px] text-center md:text-start lg:text-start font-bold text-white'>Tus Reservas</h2>
            </header>
            <section className='w-full flex flex-col gap-5 justify-between items-center h-[15%]'>
                <div className='flex flex-col gap-5 w-full'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={'"Día"'} views={['day']} slotProps={{
                            textField: { sx: datePickerStyles }
                        }} />
                        <DatePicker label={'"Mes"'} views={['month']} slotProps={{
                            textField: { sx: datePickerStyles }
                        }} />
                    </LocalizationProvider>
                </div>
                <button className='bg-[#F6BF41] text-black rounded-[20px] text-[16px] lg:text-[24px] font-semibold h-[10vh] w-[15vw] min-h-[80px] min-w-[150px] transition hover:scale-110 hover:shadow-xl'>Crear Reserva</button>
            </section>
            <section className='h-[55%] flex flex-col gap-5'>
                {events.map((event, index)=>(
                    <Card_info_resv key={index} event={event}/>
                ))}
            </section>
        </div>
    )
}