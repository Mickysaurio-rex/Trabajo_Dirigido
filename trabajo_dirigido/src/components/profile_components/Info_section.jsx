import * as React from 'react';

export default function Info_section({ tittle, info, state}) {
    return(
        <div className='px-5 h-[15vh] flex flex-col gap-2 bg-black/70 backdrop-blur-[3px] rounded-[20px] place-content-center'>
            <h2 className='text-xl text-white'>
                {tittle}
            </h2>
            <div className='bg-white/60 rounded-[10px] w-full'>
                {state ? (
                    <p className='text-black text-md p-2'>{info}</p>
                ) : (
                    <input className='text-black text-md rounded-[10px] p-2 w-full' value={info}></input>
                )}
            </div>
        </div>
    )
}
