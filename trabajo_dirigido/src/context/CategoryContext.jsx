import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de categoría
const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categoria, setCategoria] = useState(null);

    // Cargar la categoría desde localStorage al inicio
    useEffect(() => {
        const categoriaGuardada = localStorage.getItem("categoriaSeleccionada");
        if (categoriaGuardada) {
            setCategoria(categoriaGuardada);
        }
    }, []);

    // Función para actualizar la categoría y guardarla en localStorage
    const setCategoriaPersistente = (nuevaCategoria) => {
        setCategoria(nuevaCategoria);
        localStorage.setItem("categoriaSeleccionada", nuevaCategoria);
    };

    return (
        <CategoryContext.Provider value={{ categoria, setCategoria: setCategoriaPersistente }}>
            {children}
        </CategoryContext.Provider>
    );
}

// Hook personalizado para acceder al contexto
export function useCategory() {
    return useContext(CategoryContext);
}
