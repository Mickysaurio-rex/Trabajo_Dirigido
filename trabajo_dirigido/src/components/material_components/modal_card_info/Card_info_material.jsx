import * as React from 'react';
import Info_section from './Info_section';
import Form_section from './Form_section';

export default function Card_info_material({ element, state, setStateModal }) {
   
    const [stateEdit, setStateEdit] = React.useState(false);

    React.useEffect(() => {
        if (state) {
            document.body.style.overflow = 'hidden'; // Bloquea el scroll
        } else {
            document.body.style.overflow = 'auto'; // Restaura el scroll
        }
    }, [state]);

    const handleCloseModal = () => {
        setStateModal(false);
        setStateEdit(false);
    }
    return (
        <>
            {state &&
                <div className='w-screen h-screen bg-white/60 flex justify-center items-center fixed'>
                    <div className='flex flex-col md:flex-row lg:flex-row lg:gap-y-[25px] bg-[#F6BF41] rounded-[30px] w-[80%] h-[90%] lg:h-[70%] '>
                        <section className="bg-[url('/public/UPB_30Anios.jpg')] opacity-40 bg-contain place-content-center justify-items-center w-full lg:w-[40%] h-[30%] lg:h-full">
                            <img src="/Sierra_circular.jpg" className='w-[40%] lg:w-[70%]' />
                        </section>
                        <section className='py-3 lg:py-5 lg:px-10 lg:w-[60%] h-full flex flex-col justify-between gap-5'>
                            <div className='flex justify-end items-center px-5 lg:px-0 h-[10%]'>
                                <button onClick={handleCloseModal}>
                                    <span className="iconify mdi--close-box w-[24px] h-[24px] text-black"></span>
                                </button>
                            </div>
                            {
                                !stateEdit ? <Info_section element={element} setStateEdit={setStateEdit}/> :
                                <Form_section element={element} setStateEdit={setStateEdit} />                        
                            }    
                        </section>
                    </div>
                </div>
            }
        </>
    )
}
