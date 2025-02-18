import { Formik } from "formik";

export default function Form_section({element, setStateEdit}) {

    const handleSave = () => {
        setStateEdit(false)
    }
    return (
        <>
            <Formik>
                <form className="flex flex-col gap-y-5">
                    <section className='flex flex-col gap-[20px] justify-around items-start px-10 w-full'>
                        <input id='materialName_form' placeholder={element.name} className='text-black font-bold text-2xl md:text-3xl lg:text-[48px] rounded-lg w-[80%]'/>
                        <input id='materialInfo_form' placeholder={element.info} className='text-black text-xs md:text-base lg:text-2xl rounded-lg w-[80%]' />
                        <article className='text-black flex flex-col gap-[20px] w-full'>
                            <div className='flex gap-[25px] font-medium items-center'>
                                <p className='font-medium lg:text-[24px]'>Código: </p>
                                <input id='materialCode_form' className='lg:text-[20px] rounded-lg' />
                            </div>
                            <div className='flex gap-[25px] font-medium items-center'>
                                <p className='font-medium lg:text-[24px]'>Marca: </p>
                                <input id='materialMark_form' className='lg:text-[20px]' />
                            </div>
                            <div className='flex gap-[25px] font-medium items-center'>
                                <p className='font-medium lg:text-[24px]'>Año de adquisición: </p>
                                <input id='materialYear_form' className='lg:text-[20px]' />
                            </div>
                            <div className='flex gap-[25px] font-medium items-center'>
                                <p className='font-medium lg:text-[24px]'>Estante: </p>
                                <input id='materialEstante_form' className='lg:text-[20px]' />
                            </div>
                        </article>
                    </section>
                    <section className='w-full px-10 flex gap-5'>
                        <button 
                        onClick={handleSave}
                        className='font-medium lg:text-[28px] min-h-[60px] bg-[#2662B1] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                            Guardar
                        </button>
                        <button className='font-medium lg:text-[28px] min-h-[60px] bg-[#FA3E41] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                            Cancelar
                        </button>
                    </section>
                </form>
            </Formik>
        </>
    )
}