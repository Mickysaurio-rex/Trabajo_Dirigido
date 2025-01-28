import * as React from 'react';
import { Formik } from 'formik'


export default function FieldText({ texto, icon_name, type_input, tagname }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const codeRegex = /^[1-9]{5}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
    const phoneRegex = /^[6-7]\d{7}$/;

    return (
        <div className="flex flex-col min-h-[50px] w-11/12">
            <Formik
                initialValues={{ fieldValue: '' }}
                onSubmit={(values, actions) => {
                    // Aquí puedes manejar la lógica de envío del formulario y la validación de los valores
                    // Por ejemplo, puedes mostrar una alerta con los valores ingresados
                    alert(`Valor ingresado: ${values.fieldValue}`);
                    actions.resetForm(); // Reinicia el formulario después de enviarlo
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.fieldValue.trim()) {
                        errors.fieldValue = 'Este campo es requerido';
                    } else if (tagname === "email_registration" && !emailRegex.test(values.fieldValue)) {
                        errors.fieldValue = 'No es un correo válido'
                    } else if (tagname === "code_login" && !codeRegex.test(values.fieldValue)) {
                        errors.fieldValue = 'Su código debe tener 5 dígitos'
                    } else if (tagname === "password_registration" && !passwordRegex.test(values.fieldValue)) {
                        errors.fieldValue = 'Su contraseña debe tener 6 a 10 letras entre mayúsculas, minúsculas y números'
                    } else if (tagname === "password_confirm_registration" && !passwordRegex.test(values.fieldValue)) {
                        errors.fieldValue = 'Su contraseña debe tener 6 a 10 letras entre mayúsculas, minúsculas y números'
                    } else if (tagname === "phone_registration" && !phoneRegex.test(values.fieldValue)) {
                        errors.fieldValue = 'Su telefono debe ser válido, y de 8 números!'
                    }
                    return errors;
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                <div className='flex items-center border border-black rounded-[20px] px-5  space-x-5'>
                    <span className={`${icon_name} scale-[1.8] text-black`}></span>
                    <input type={type_input}
                        className='bg-transparent w-full h-full text-black/60 md:py-3 lg:py-5 text-[14px] md:text-[20px] lg:text-[20px] placeholder:text-black/60 placeholder:sm:text-[14px] placeholder:md:text-[20px] placeholder:lg:text-[20px]'
                        placeholder={texto} 
                        onChange={handleChange('fieldValue')}
                        onBlur={handleBlur('fieldValue')}
                        value={values.fieldValue}></input>
                </div>
                <div>
                    {errors.fieldValue && <p className='text-red-500 text-[12px]'>{errors.fieldValue}</p>}
                    </div>
                    </>
                )}
            </Formik>
        </div>
    )
}
