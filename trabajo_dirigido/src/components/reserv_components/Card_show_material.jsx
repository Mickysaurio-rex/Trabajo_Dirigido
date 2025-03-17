import { useReserva } from "../../context/ReservaContext";

export default function Card_show_material({material}){
    const {reserva, setReserva} = useReserva();

    const handleRemoveMaterial = (materialId) => {
        setReserva((prevState) => ({
            ...prevState,
            materiales: prevState.materiales.filter((material) => material.id !== materialId),
        }));
    };

    return(
        <div className="flex justify-between items-center w-full h-[10vh] min-h-[200px] bg-black/70 backdrop-blur-[6px] p-5 rounded-2xl">
            <section className="flex justify-center items-center w-[20%] h-full ">
                <h2 className="text-white font-semibold text-[42px]">
                    {material.nombre}
                </h2>
            </section>
            <section className="flex justify-center items-center w-[20%] h-full">
                <img className="h-[90%] bg-white px-5 rounded-lg" src={material.imagen} />
            </section>
            <section className="flex justify-center items-center w-[30%] h-full">
                <button 
                onClick={() => handleRemoveMaterial(material.id)}
                className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#FA3E41] rounded-[20px] shadow-lg md:w-[40%] lg:w-[80%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'>
                    Eliminar
                </button>
            </section>
        </div>
    )
}