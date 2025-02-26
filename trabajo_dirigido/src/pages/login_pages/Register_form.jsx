import * as React from 'react';
import FieldText from '../../components/generalComponents/FieldText';
import Modal_card from '../../components/generalComponents/Modal_card';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import firebaseApp from '../../firebase/credenciales';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


export default function Register_form() {
  const [modalState, setState] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const nameRegex = /^[A-Z][a-záéíóúñ]+( [A-Z][a-záéíóúñ]+)?$/;
  const last_nameRegex = /^[A-Z][a-záéíóúñ]+ [A-Z][a-záéíóúñ]+$/;
  const codeRegex = /^[1-9]{5}$/;
  const phoneRegex = /^[67]\d{7}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const values_field = {
    name: { text: 'Nombre(s)', icon: 'iconify mdi--person', type: 'text' },
    last_name: { text: 'Apellidos', icon: 'iconify mdi--person', type: 'text' },
    phone: { text: 'Teléfono', icon: 'iconify mdi--phone', type: 'tel' },
    email: { text: 'Correo', icon: 'iconify mdi--email', type: 'email' },
    password: { text: 'Contraseña', icon: 'iconify mdi--lock', type: 'password' }
  }

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  async function registrarUsuario(elemento) {
    try {
      const infoUsuario = await createUserWithEmailAndPassword(auth, elemento.email, elemento.password).then((usuarioFirebase) => {
        return usuarioFirebase;
      });
      console.log("este es el usuario: " + infoUsuario.user.uid);
      const docuRef = await doc(firestore, `usuarios/${infoUsuario.user.uid}`)
      await setDoc(docuRef, { nombre: elemento.name, apellidos: elemento.last_name, telefono: elemento.phone, rol: 'usuario', correo: elemento.email })
      await signOut(auth);
      setMessage('Usuario creado exitosamente. Por favor Inicie Sesión');
      setState(true);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("El correo ya está en uso");
      } else if (error.code === "auth/weak-password") {
        setMessage("La contraseña es muy débil");
      } else if (error.code === "auth/invalid-email") {
        setMessage("El formato del correo es inválido");
      } else {
        setMessage("Error desconocido:", error.message);
      }
      setState(true);
    }
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
              } else if (!last_nameRegex.test(valores.last_name)) {
                errores.last_name = 'Por favor revise sus apellidos';
              }
              if (!valores.phone) {
                errores.phone = 'El teléfono es obligatorio';
              } else if (!phoneRegex.test(valores.phone)) {
                errores.phone = 'Por favor ingrese un número de celular válido';
              }
              if (!valores.email) {
                errores.email = 'El correo es obligatorio';
              } else if (!emailRegex.test(valores.email)) {
                errores.email = 'Por favor ingrese un correo válido';
              }
              if (!valores.password) {
                errores.password = 'La contraseña es obligatoria';
              } else if (!passwordRegex.test(valores.password)) {
                errores.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
              }
              return errores;
            }}
            initialValues={{ name: '', last_name: '', phone: '', email: '', password: '' }}
            onSubmit={(valores, { resetForm }) => {
              registrarUsuario(valores);
              resetForm();
              // {setState(true)};
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
                    type="submit"
                    className='bg-[#FFE3A4] text-black font-medium w-11/12 min-h-[50px] h-1/3 text-xl lg:text-2xl rounded-[15px] drop-shadow-lg text-[25px]'
                  >REGISTRARSE</button>
                </section>
              </form>
            )}
          </Formik>
        </section>
      </section>
      <Modal_card info={message} state={modalState} setState={setState} />
    </div>
  )
}
