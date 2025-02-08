import * as React from 'react';
import FieldText from '../../components/generalComponents/FieldText';
import { Formik } from 'formik';

export default function Login_page() {
  const codeRegex = /^[1-9]{5}$/;

  const values_field = {
    code: { text: 'Código de Acceso', icon: 'iconify mdi--person', type: 'text', name: 'code' },
    password: { text: 'Contraseña', icon: 'iconify mdi--lock', type: 'password', name: 'password' }
  }

  return (
    <div className="bg-[url('fondo_login.jpg')] lg:bg-cover md:bg-cover bg-cover h-screen min-h-[700px] p-12 grid justify-items-center place-items-center lg:flex">
      <section className='flex flex-col items-center gap-y-5 md:gap-y-10 lg:gap-y-10 bg-white/50 backdrop-blur-md min-h-[500px] h-[70vh] md:h-[90vh] lg:h-[90vh] md:w-[40vw] lg:w-[40vw] rounded-[20px] p-10'>
        <img src="logo_upb.png" className='lg:w-3/12 md:w-4/12 h-auto w-2/3' />
        <h1 className='text-2xl lg:text-4xl text-black font-bold'>INICIA SESIÓN</h1>
        <section className='w-full h-5/6 flex flex-col justify-center items-center gap-5 md:gap-10 lg:gap-10'>
          <Formik
            validate={(valores) => {
              let errores = {};
              if (!valores.code) {
                errores.code = 'El código es obligatorio';
              } else if (!codeRegex.test(valores.code)) {
                errores.code = 'Coloque su código correcto Por Favor';
              }

              if (!valores.password) {
                errores.password = 'La contraseña es obligatoria'
              }
              return errores;
            }
            }

            initialValues={{ code: '', password: '' }}
            onSubmit={(valores, { resetForm }) => {
              resetForm()
              console.log(valores);
            }}
          >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
              <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-around items-center'>
                <section id='inputs_section' className='w-full h-1/2 flex flex-col justify-around items-center '>
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
                <section id='btns_section' className='w-full h-[40%] grid items-center place-items-center'>
                  <button
                    type="submit"
                    className='bg-[#F6BF41] text-black font-medium w-11/12 min-h-[50px] h-[80%] text-xl lg:text-2xl rounded-[20px] drop-shadow-lg text-[25px]'>ACCEDER</button>
                  <button
                    className='bg-[#FFE3A4] text-black font-medium w-11/12 min-h-[50px] h-[80%] text-xl lg:text-2xl rounded-[20px] drop-shadow-lg text-[25px]'>REGISTRARSE
                  </button>
                </section>
              </form>
            )}
          </Formik>
        </section>
      </section>
    </div>
  )
}
