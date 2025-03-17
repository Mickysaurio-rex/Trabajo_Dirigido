export default function Confirm_modal({selectedDate, selectedTimes}) {
    return (
        <div className="text-center">
            <h2 className="text-xl font-bold">¿Estás seguro de este horario?</h2>
            <p className="mt-4">Fecha: {selectedDate?.toLocaleDateString()}</p>
            <p>Horarios: {selectedTimes.sort((a, b) => a - b).join(", ")}</p>
        </div>
    )
}