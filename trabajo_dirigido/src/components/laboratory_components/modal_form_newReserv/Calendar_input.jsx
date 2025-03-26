import { useEffect, useRef, useState } from "react";
import "cally";
import "../styles_calendar/calendar_info_style.css"

export default function Calendar_input({ setSelectedDate, selectedDate }) {
    const [value, setValue] = useState("");
    const [dateValues, setDateValues] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        const calendar = calendarRef.current;
        if (!calendar) return;

        const handleChange = (event) => {
            let newStringValue = event.target.value;
            let newDateValues = [];

            const convertToLocalDate = (dateString) => {
                const [year, month, day] = dateString.split("-").map(num => parseInt(num, 10));
                const date = new Date(year, month - 1, day);
                return date;
            };

            if (typeof newStringValue === "string" && newStringValue.includes(" ")) {
                newDateValues = newStringValue.split(" ").map(date => convertToLocalDate(date.trim()));
            } else {
                newDateValues = [convertToLocalDate(newStringValue)];
            }

            setValue(newStringValue);
            setDateValues(newDateValues);
            setSelectedDate(newDateValues);
        };

        calendar.addEventListener("change", handleChange);

        return () => {
            calendar.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        if (selectedDate.length > 0) {
            const formattedDates = selectedDate.map((date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }).join(" ");
            setValue(formattedDates);
        }
    }, [selectedDate]);

    return (
        <div className="text-center w-[95%] md:w-[80%] flex flex-col items-center gap-2">
            <h2 className="text-xl font-medium bg-black/60 text-white w-[80%] md:w-[60%] py-4 rounded-3xl text-center">Selecciona una Fecha</h2>
            <div className="w-[95%] md:w-[80%]">
            <calendar-multi
                ref={calendarRef}
                value={value}
                min="2025-03-01"
                locale="en-GB"
            >
                <svg
      aria-label="Previous"
      slot="previous"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
    </svg>
    <svg
      aria-label="Next"
      slot="next"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
    </svg>
                <calendar-month />
            </calendar-multi>
            </div>
        </div>
    );
}
