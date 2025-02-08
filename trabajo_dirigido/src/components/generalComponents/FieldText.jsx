import * as React from 'react';

export default function FieldText({ text, icon_name, type_input, name, function_onChange, function_onBlur, values, errors, isTouched }) {
    return (
        <>
        <div className="flex flex-col min-h-[50px] w-11/12">
                <div className='flex items-center border border-black rounded-[20px] px-5 space-x-5 h-full'>
                    <span className={`${icon_name} scale-[1.8] text-black`}></span>
                    <input type={type_input}
                        className='bg-transparent w-full h-full text-black/60 md:py-3 lg:py-7 text-[14px] md:text-[20px] lg:text-[20px] placeholder:text-black/60 placeholder:sm:text-[14px] placeholder:md:text-[20px] placeholder:lg:text-[20px]'
                        placeholder={text} 
                        name={name}
                        onChange={function_onChange}
                        onBlur={function_onBlur}
                        value={values}></input>
                </div>
        </div>
        <div className='w-11/12'> {isTouched && errors && <p className='text-red-500 text-left text-[12px]'>{errors}</p>} </div>
        </>
    )
}
