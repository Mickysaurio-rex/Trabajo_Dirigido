export default function Confirm_modal({selectedDate, selectedTimes}) {
    return (
        <div className="text-center">
            <h2 className="text-xl font-bold">¿Estás seguro de reservar?</h2>
            <p className="mt-4">Fecha: {selectedDate?.toLocaleDateString()}</p>
            <p>Horarios: {selectedTimes.join(", ")}</p>
        </div>
    )
}