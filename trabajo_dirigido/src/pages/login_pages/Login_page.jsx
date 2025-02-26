import * as React from 'react';
import FieldText from '../../components/generalComponents/FieldText';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Modal_card from '../../components/generalComponents/Modal_card';
import firebaseApp from '../../firebase/credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default function Login_page() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = React.useState('');
  const [modalState, setState] = React.useState(false);

  const authFirebaseAndLogin = async (values) => {
    try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate('/app');
    } catch (error) {
        switch (error.code) {
            case 'auth/invalid-email':
                setErrorModal('El correo no tiene un formato válido');
                break;
            case 'auth/user-disabled':
                setErrorModal('Este usuario ha sido deshabilitado');
                break;
            case 'auth/user-not-found':
              setErrorModal( 'No se encontró un usuario con ese correo' );
                break;
            case 'auth/wrong-password':
                setErrorModal( 'Contraseña incorrecta' );
                break;
            case 'auth/network-request-failed':
                setErrorModal( 'Problemas con la conexión a la red. Intenta nuevamente.' );
                break;
            default:
                setErrorModal( 'Error desconocido. Intenta nuevamente más tarde.' );
                break;
        }
        setState(true);
    }
}

  const values_field = {
    email: { text: 'Correo', icon: 'iconify mdi--person', type: 'text', name: 'email' },
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
              if (!valores.email) {
                errores.email = 'El correo es obligatorio';
              } else if (!emailRegex.test(valores.email)) {
                errores.email = 'Coloque un correo válido Por Favor';
              }

              if (!valores.password) {
                errores.password = 'La contraseña es obligatoria'
              }
              return errores;
            }
            }

            initialValues={{ email: '', password: '' }}
            onSubmit={async (valores, { resetForm }) => {
              authFirebaseAndLogin(valores);
              resetForm();
            }}
          >
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
              <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-around items-center'>
                <section id='inputs_section' className='w-full h-1/2 flex flex-col justify-around items-center '>
                  {Object.entries(values_field).map(([key, value]) => (
                    <FieldText
                      key={key}
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
                  type="button"
                  onClick={() => navigate("/register")}
                    className='bg-[#FFE3A4] text-black font-medium w-11/12 min-h-[50px] h-[80%] text-xl lg:text-2xl rounded-[20px] drop-shadow-lg text-[25px]'>REGISTRARSE
                  </button>
                </section>
              </form>
            )}
          </Formik>
        </section>
      </section>
     <Modal_card info={errorModal} state={modalState} setState={setState} /> 
    </div>
  )
}
