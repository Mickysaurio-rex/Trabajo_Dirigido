import * as React from 'react';
import FieldText from '../components/generalComponents/FieldText';

export default function App() {
  const placeholder_1 = "Código de Acceso";
  const placeholder_2 = "Contraseña";
  const icon_name1 = "iconify mdi--person"
  const icon_name2 = "iconify mdi--lock"
  const type_text = "text";
  const type_pwd = "password"
  return (
    <div className="bg-[url('./public/fondo_login.jpg')] lg:bg-cover md:bg-cover bg-cover h-screen p-12 grid justify-items-center place-items-center lg:flex ">
      <section className='flex flex-col items-center gap-y-5 md:gap-y-10 lg:gap-y-10 bg-white/50 backdrop-blur-md h-[70vh] md:w-[40vw] md:h-[90vh] lg:w-[40vw] lg:h-[90vh] rounded-[20px] p-10'>
        <img src="logo_upb.png" className='lg:w-3/12 md:w-4/12 h-auto w-2/3'/>
        <h1 className='text-2xl lg:text-4xl text-black font-bold'>INICIA SESIÓN</h1>
        <section className='w-full h-2/4 flex flex-col justify-center items-center gap-5 md:gap-10 lg:gap-10'>
          <FieldText texto={placeholder_1} icon_name={icon_name1} type_input={type_text} />
          <FieldText texto={placeholder_2} icon_name={icon_name2} type_input={type_pwd}/>
        </section>
        <section className='grid w-full h-1/3 justify-items-center gap-1'>
          <button
          onClick={() => console.log("Hola Mundo")} 
          className='bg-[#F6BF41] text-black font-medium w-11/12 min-h-[50px] h-2/3 text-xl lg:text-2xl rounded-[20px] drop-shadow-lg text-[25px]'>ACCEDER</button>
          <button 
          onClick={() => console.log("Adiós Mundo")}
          className='bg-[#FFE3A4] text-black font-medium w-11/12 min-h-[50px] h-2/3 text-xl lg:text-2xl rounded-[20px] drop-shadow-lg text-[25px]'>REGISTRARSE</button>
        </section>
      </section>
    </div>

  )
}
