import * as React from 'react';
import FieldText from '../components/generalComponents/FieldText';
import Modal_card from '../components/generalComponents/Modal_card';

export default function Register_form() {
  const placeholder_1 = "Nombre(s)"
  const placeholder_2 = "Apellidos"
  const placeholder_3 = "Código"
  const placeholder_4 = "Teléfono"
  const placeholder_5 = "Correo"
  const placeholder_6 = "Contraseña"
  const icon_name1 = "iconify mdi--person"
  const icon_name2 = "iconify mdi--lock"
  const icon_name3 = "iconify mdi--hashtag"
  const icon_name4 = "iconify mdi--phone"
  const icon_name5 = "iconify mdi--email"
  const type_text = "text";
  const type_pwd = "password"


  const [modalState, setState] = React.useState(false);


  return (
    <div className="bg-[url('./public/fondo_login.jpg')] lg:bg-cover md:bg-cover bg-auto w-screen h-screen grid justify-items-center place-items-center">
      <section className='flex flex-col items-center justify-between bg-white/50 backdrop-blur-md md:w-[35vw] md:h-[95vh] lg:w-[35vw] lg:h-[90%] rounded-[20px] p-6'>
        <img src="logo_upb.png" className='lg:w-3/12 md:w-4/12 h-auto w-2/3' />
        <h1 className='text-2xl lg:text-4xl text-black font-bold'>COMPLETA LOS DATOS</h1>
        <section className='w-full flex flex-col h-[80%] overflow-y-auto items-center justify-around'>
          <FieldText texto={placeholder_1} icon_name={icon_name1} type_input={type_text} />
          <FieldText texto={placeholder_2} icon_name={icon_name2} type_input={type_text} />
          <FieldText texto={placeholder_3} icon_name={icon_name3} type_input={type_text} tagname={"code_login"}/>
          <FieldText texto={placeholder_4} icon_name={icon_name4} type_input={type_text} tagname={"phone_registration"}/>
          <FieldText texto={placeholder_5} icon_name={icon_name1} type_input={type_text} tagname={"email_registration"}/>
          <FieldText texto={placeholder_6} icon_name={icon_name2} type_input={type_pwd} tagname={"password_registration"}/>
        </section>
        <section className='grid w-full justify-items-center'>
          <button
            className='bg-[#FFE3A4] text-black font-medium w-11/12 min-h-[50px] h-1/3 text-xl lg:text-2xl rounded-[15px] drop-shadow-lg text-[25px]'
            onClick={() => setState(true)}>REGISTRARSE</button>
        </section>
      </section>
      <Modal_card info={"Acaba de crear un usuario. Por favor inicie Sesión"} state={modalState} setState={setState} />
    </div>
  )
}
