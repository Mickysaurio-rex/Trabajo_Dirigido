import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from '../components/generalComponents/Navbar';
import Footer from '../components/generalComponents/Footer';

export default function App() {
  return (
    <div className="bg-[url('../public/UPB_30Anios.jpg')] bg-repeat bg-[length:400px_450px] min-h-[100vh] space-y-5">
      <section className='flex flex-col'>
        <Navbar />
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}
