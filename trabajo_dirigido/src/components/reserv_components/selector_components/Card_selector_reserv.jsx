import * as React from 'react';
import { useReserva } from '../../../context/ReservaContext';

export default function Card_selector_material({ id, tittle, info, element_img }) {
    const { reserva, setReserva } = useReserva();

    // Verificar si el material ya está en la reserva
    const isMaterialSelected = reserva.materiales.some(material => material.id === id);
    const [isSelected, setIsSelected] = React.useState(isMaterialSelected);

    // Efecto para actualizar el estado visual cuando el contexto cambia
    React.useEffect(() => {
        setIsSelected(reserva.materiales.some(material => material.id === id));
    }, [reserva.materiales, id]);

    // Función para agregar o quitar el material del contexto
    const handleSelection = () => {
        setReserva((prevState) => {
            const alreadySelected = prevState.materiales.some(material => material.id === id);

            return {
                ...prevState,
                materiales: alreadySelected
                    ? prevState.materiales.filter(material => material.id !== id) // Si ya estaba, lo elimina
                    : [...prevState.materiales, { id: id, nombre: tittle, descripcion: info, imagen: element_img }], // Si no estaba, lo agrega
            };
        });
    };

    return (
        <div 
            className={`backdrop-blur-sm rounded-[30px] flex flex-col py-5 px-5 h-[55vh] min-h-[450px] w-[25vw] min-w-[300px] md:min-w-[330px] lg:min-w-[330px] lg:max-w-lg
                ${isSelected ? 'bg-green-500' : 'bg-[#D9D9D9]/80'}`} 
            onClick={handleSelection} 
        >
            <section className='h-[90%] cursor-pointer flex flex-col gap-1 scrollbar-hide'>
                <div className="w-full h-[50%] flex justify-center items-center rounded-lg bg-gradient-to-br from-[#FFE09E] to-[#F6BF49]">
                    <img className="rounded-lg bg-cover w-[80%] h-[90%]" src={element_img} alt="" />
                </div>
                <div className='overflow-y-auto h-[45%]'>
                    <h5 className="mb-2 text-2xl lg:text-3xl font-bold tracking-tight text-black">{tittle}</h5>
                    <p className="mb-3 text-[16px] text-black">{info}</p>
                </div>
            </section>
        </div>
    );
}
