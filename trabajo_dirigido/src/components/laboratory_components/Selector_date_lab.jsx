import React, { useState, useEffect } from "react";

export default function Selector_date_lab({ setSelectedDate }) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [daysInMonth, setDaysInMonth] = useState(31);

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    useEffect(() => {
        if (selectedMonth !== "") {
            setDaysInMonth(getDaysInMonth(parseInt(selectedMonth), currentYear));
        } else {
            setDaysInMonth(31);
        }
    }, [selectedMonth]);

    useEffect(() => {
        setSelectedDate({ month: selectedMonth, day: selectedDay });
    }, [selectedMonth, selectedDay, setSelectedDate]);

    const selectConfig = [
        {
            label: "Día",
            id: "dia",
            options: [""].concat(Array.from({ length: daysInMonth }, (_, i) => i + 1)),
            value: selectedDay,
            onChange: (e) => setSelectedDay(e.target.value),
        },
        {
            label: "Mes",
            id: "mes",
            options: [""].concat(months.slice(currentMonth).map((name, index) => ({
                name,
                value: currentMonth + index
            }))),
            value: selectedMonth,
            onChange: (e) => setSelectedMonth(e.target.value),
        },
        {
            label: "Año",
            id: "anio",
            options: [currentYear],
            value: currentYear,
            onChange: null,
            disabled: true,
        },
    ];

    return (
        <div className="flex flex-col md:flex-row lg:flex-row w-full justify-between gap-2">
            {selectConfig.map(({ label, id, options, value, onChange, disabled }) => (
                <div key={id} className="flex w-full md:w-[30%] lg:w-[30%] bg-black/70 backdrop-blur-[6px] rounded-md gap-2 px-5 py-5">
                    <label htmlFor={`selector_${id}`} className="text-white text-xl font-semibold">
                        {label}
                    </label>
                    <select
                        id={`selector_${id}`}
                        className="w-full bg-transparent text-white text-xl text-right px-5"
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    >
                        <option value="" className="text-black">Todos</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value || option} className="text-black">
                                {option.name || option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}
