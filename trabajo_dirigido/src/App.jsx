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
import New_reserv_page from "./pages/reservation_page/New_reserv_page";
import Selector_material_page from "./pages/reservation_page/Selector_material_page";
import Reserva_info_page from "./pages/laboratory_pages/Reserva_info_page";

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
                    <Route path="nueva_reserva" element={<New_reserv_page />}/>
                    <Route path="nv_reserv_materials" element={<Selector_material_page />} />
                    <Route path="materiales" element={<Materiales />} />
                    <Route path="materiales_selec" element={<Materiales_selector />} />
                    <Route path="perfil" element={<Perfil />} />
                    <Route path="reservLab_info/:id" element={<Reserva_info_page />} /> 
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
