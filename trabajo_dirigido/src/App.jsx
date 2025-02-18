import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login_pages/Login_page'
import Register from './pages/login_pages/Register_form'
import AppLayout from './layout/App_layout'
import Inicio from './pages/home_pages/Home_page'
import Laboratorio from './pages/laboratory_pages/Laboratory_page'
import Reserva from './pages/reservation_pages/reservation_page'
import Materiales from './pages/material_pages/Material_category_page'
import Materiales_selector from './pages/material_pages/Material_selector_page'
import Perfil from './pages/profile_pages/Profile_page'

export default function App() {
    const isAuthenticated = true;

    return (
        <Router>
            <Routes>

                {/*Rutas públicas*/}
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />


                {/*Rutas protegidas*/}
                <Route
                    path="/app"
                    element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}
                >
                    <Route index element={<Inicio />} />
                    <Route path="laboratorio" element={<Laboratorio />} />
                    <Route path="reserva" element={<Reserva />} />
                    <Route path='materiales' element={<Materiales />}/>
                    <Route path="materiales_selec" element={<Materiales_selector />} />
                    <Route path="perfil" element={<Perfil />} />
                </Route>


            </Routes>
        </Router>
    )
}