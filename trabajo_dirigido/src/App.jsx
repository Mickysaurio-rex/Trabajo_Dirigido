import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Importamos el contexto
import Login from "./pages/login_pages/Login_page";
import Register from "./pages/login_pages/Register_form";
import AppLayout from "./layout/App_layout";
import Inicio from "./pages/home_pages/Home_page";
import Laboratorio from "./pages/laboratory_pages/Laboratory_page";
import Reserva from "./pages/reservation_page/Reservation_page";
import Materiales from "./pages/material_pages/Material_category_page";
import Materiales_selector from "./pages/material_pages/Material_selector_page";
import Perfil from "./pages/profile_pages/Profile_page";
import Info_Calendar_page from "./pages/laboratory_pages/Info_Calendar_Page";

function AppRoutes() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={user ? <Navigate to="/app" /> : <Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas */}
                <Route path="/app" element={user ? <AppLayout /> : <Navigate to="/" />}>
                    <Route index element={<Inicio />} />
                    <Route path="laboratorio" element={<Laboratorio />} />
                    <Route path="laboratorio_info" element={<Info_Calendar_page />} />
                    <Route path="reserva" element={<Reserva />} />
                    <Route path="materiales" element={<Materiales />} />
                    <Route path="materiales_selec" element={<Materiales_selector />} />
                    <Route path="perfil" element={<Perfil />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}
