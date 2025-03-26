import Calendar from "react-calendar";

export default function Calendar_input({ setSelectedDate, selectedDate }) {
    return (
        <div className="text-center w-[95%] md:w-[80%] flex flex-col items-center">
            <h2 className="text-xl font-medium bg-black/60 text-white w-[80%] md:w-[60%] py-4 rounded-3xl text-center">Selecciona una Fecha</h2>
            <Calendar onChange={(date) => setSelectedDate(date)}
                value={selectedDate ? new Date(selectedDate) : null}
                className="mx-auto mt-4" />
        </div>
    )
}