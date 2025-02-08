import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/generalComponents/Navbar';
import Home_page from './pages/home_pages/Home_page';
import Material_selector_page from './pages/material_pages/Material_selector_page';
import Laboratory_page from './pages/laboratory_pages/Laboratory_page';
import Profile_page from './pages/profile_pages/Profile_page';
import Footer from './components/generalComponents/Footer';
import Info_Calendar_Page from './pages/laboratory_pages/Info_Calendar_Page';

export default function App() {
  return (
    <div className="bg-[url('./public/UPB_30Anios.jpg')] bg-repeat bg-[length:400px_450px] min-h-[100vh]"> 
    <Router>
      <section className='p-10 flex flex-col gap-10'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/materiales" element={<Material_selector_page />} />
        <Route path="/laboratorios" element={<Laboratory_page />} />
        <Route path="/info_calen_lab" element={<Info_Calendar_Page />} />
        <Route path="/perfil" element={<Profile_page />} />
      </Routes>
      </section>
      <Footer />
    </Router>
    </div>
  );
}
