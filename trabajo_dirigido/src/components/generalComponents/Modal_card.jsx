import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
export default function Modal_card({ info, state, setState }) {

    const navigate = useNavigate();
 
    const handleClick = () => {
        setState(false);
        navigate("/");
    }

    return (
        <>
        {state && 
        <div className='w-screen h-screen flex items-center justify-center absolute'>
            <div className='rounded-2xl bg-white/50 backdrop-blur-sm w-2/4 py-10 place-items-center place-content-center flex flex-col gap-10'>
                <section className='bg-black/70 backdrop-blur-sm w-4/6 rounded-lg p-5'>
                    <p className='text-white text-center font-bold'>
                        {info}
                    </p>
                </section>
                <section className='w-2/5'>
                    <button onClick={handleClick} className='bg-[#F6BF41] text-black font-medium w-full h-[6vh] rounded-xl text-[20px] transition hover:scale-110 hover:shadow-xl focus:outline-none'>
                        Continuar
                    </button>
                </section>
            </div>
        </div>
        }
        </>
    )
}