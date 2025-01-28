import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/generalComponents/Navbar';
import Home_page from './pages/Home_page';
import Material_selector_page from './pages/material_pages/Material_selector_page';
import Laboratory_page from './pages/laboratory_pages/Laboratory_page';
import Profile_page from './pages/profile_pages/Profile_page';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/materiales" element={<Material_selector_page />} />
        <Route path="/laboratorios" element={<Laboratory_page />} />
        <Route path="/perfil" element={<Profile_page />} />
      </Routes>
    </Router>
  );
}
