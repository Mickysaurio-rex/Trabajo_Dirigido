import { createContext, useContext, useState } from "react";

const ReservaContext = createContext();

export function ReservaProvider({ children }){
    const [reserva, setReserva]  = useState(
        {
            fecha: null,
            horarios: [],
            materiales: []
        }
    );

    return(
        <ReservaContext.Provider value={{ reserva, setReserva}}>
            {children}
        </ReservaContext.Provider>
    )
}

export function useReserva() {
    return useContext(ReservaContext);
}