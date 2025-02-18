import * as React from 'react';
import FieldText from '../../components/generalComponents/FieldText';
import Modal_card from '../../components/generalComponents/Modal_card';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function Register_form() {
  const [modalState, setState] = React.useState(false);
  const nameRegex = /^[A-Z][a-záéíóúñ]+( [A-Z][a-záéíóúñ]+)?$/;
  const last_nameRegex = /^[A-Z][a-záéíóúñ]+ [A-Z][a-záéíóúñ]+$/;
  const codeRegex = /^[1-9]{5}$/;
  const phoneRegex = /^[67]\d{7}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

  const values_field = {
    name: { text: 'Nombre(s)', icon: 'iconify mdi--person', type: 'text' },
    last_name: { text: 'Apellidos', icon: 'iconify mdi--person', type: 'text' },
    code_login: { text: 'Código', icon: 'iconify mdi--hashtag', type: 'text' },
    phone: { text: 'Teléfono', icon: 'iconify mdi--phone', type: 'tel' },
    email: { text: 'Correo', icon: 'iconify mdi--email', type: 'email' },
    password: { text: 'Contraseña', icon: 'iconify mdi--lock', type: 'password' }
  }

  const navigate = useNavigate();
  return (
    <div className="bg-[url('fondo_login.jpg')] px-5 lg:bg-cover md:bg-cover bg-cover w-screen h-screen min-h-[700px] grid justify-items-center place-items-center">
      <section className='flex flex-col justify-around items-center bg-white/50 backdrop-blur-md min-h-[600px] h-[70vh] md:h-[90vh] lg:h-[95vh] md:w-[40vw] lg:w-[40vw] rounded-[20px] p-10'>
        <img src="logo_upb.png" className='lg:w-3/12 md:w-4/12 h-auto w-5/12' />
        <h1 className='text-lg md:text-xl lg:text-3xl text-black font-bold'>COMPLETA LOS DATOS</h1>
        <section className='w-full h-[85%] flex'>  
          <Formik
            validate={(valores) => {
              let errores = {};
              if (!valores.name) {
                errores.name = 'El nombre es obligatorio';
              } else if (!nameRegex.test(valores.name)) {
                errores.name = 'Por favor revise sus nombres';
              }
              if (!valores.last_name) {
                errores.last_name = 'El apellido es obligatorio';
              }else if (!last_nameRegex.test(valores.last_name)) {
                errores.last_name = 'Por favor revise sus apellidos';
              }
              if (!valores.code_login) {
                errores.code_login = 'El código es obligatorio';
              }else if (!codeRegex.test(valores.code_login)) {
                errores.code_login = 'Por favor revise que su código contenga 5 digitos';
              }
              if (!valores.phone) {
                errores.phone = 'El teléfono es obligatorio';
              }else if (!phoneRegex.test(valores.phone)) {
                errores.phone = 'Por favor ingrese un número de celular válido';
              }
              if (!valores.email) {
                errores.email = 'El correo es obligatorio';
              }else if(!emailRegex.test(valores.email)){
                errores.email = 'Por favor ingrese un correo válido';
              }
              if (!valores.password) {
                errores.password = 'La contraseña es obligatoria';
              }else if(!passwordRegex.test(valores.password)){
                errores.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
              }
              return errores;
            }}
            initialValues={{ name: '', last_name: '', code_login: '', phone: '', email: '', password: '' }}
            onSubmit={(valores, { resetForm }) => {
              resetForm();
              {setState(true)};
              console.log(valores);
            }}
          >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
              <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-between items-center'>
                <section className='w-full flex flex-col justify-between h-[90%] overflow-y-auto items-center gap-y-2'>
                  {Object.entries(values_field).map(([key, value], index) => (
                    <FieldText
                      key={index}
                      text={value.text}
                      icon_name={value.icon}
                      type_input={value.type}
                      name={key}
                      function_onChange={handleChange}
                      function_onBlur={handleBlur}
                      values={values[key]}
                      errors={errors[key]}
                      isTouched={touched[key]}
                    />
                  ))}
                </section>
                <section className='w-full grid place-items-center'>
                  <button
                    // type='submit'
                    className='bg-[#FFE3A4] text-black font-medium w-11/12 min-h-[50px] h-1/3 text-xl lg:text-2xl rounded-[15px] drop-shadow-lg text-[25px]'
                    onClick={() => setState(true)}>REGISTRARSE</button>
                </section>
              </form>
            )}
          </Formik>
          </section>
      </section>
      <Modal_card info={"Acaba de crear un usuario. Por favor inicie Sesión"} state={modalState} setState={setState} />
    </div>
  )
}
