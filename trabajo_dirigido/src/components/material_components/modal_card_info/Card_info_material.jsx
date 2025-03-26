import * as React from 'react';
import Info_section from './Info_section';
import Form_section from './Form_section';


export default function Card_info_material({ element, state, setStateModal, setMaterials, setElement }) {
   

    const [stateEdit, setStateEdit] = React.useState(false);
    const [newImage, setNewImage] = React.useState(null);

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
        setNewImage(null);
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        }
    };
    return (
        <>
            {state &&
                <div className='fixed inset-0 w-screen h-screen bg-white/60 flex justify-center items-center z-50'>
                    <div className='flex flex-col md:flex-row lg:flex-row lg:gap-y-[25px] bg-[#F6BF41] rounded-[30px] w-[80%] h-[90%] md:h-[30vh] lg:h-[70%] min-h-[600px] '>
                        <section className="bg-[url('/public/UPB_30Anios.jpg')] bg-contain place-content-center justify-items-center w-full md:w-[40%] lg:w-[40%] h-[100%] lg:h-full">
                            <img src={element.imagen} className='w-[40%] md:w-[80%] lg:w-[70%]' />
                            {stateEdit && (
                                <div className="flex flex-col items-center mt-2">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        className="hidden" 
                                        id="upload-image"
                                    />
                                    <label htmlFor="upload-image" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
                                        Cambiar Imagen
                                    </label>

                                    {newImage && (
                                        <button 
                                            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">
                                            Guardar Imagen
                                        </button>
                                    )}
                                </div>
                            )}
                        </section>
                        <section className='py-3 lg:py-5 lg:px-10 md:w-[60%] lg:w-[60%] h-full flex flex-col justify-between gap-5'>
                            <div className='flex justify-end items-center px-5 lg:px-0 h-[10%]'>
                                <button onClick={handleCloseModal}>
                                    <span className="iconify mdi--close-box w-[24px] h-[24px] text-black"></span>
                                </button>
                            </div>
                            {
                                !stateEdit ? <Info_section element={element} setStateEdit={setStateEdit}/> :
                                <Form_section element={element} setStateEdit={setStateEdit} setImage={setNewImage} setMaterials={setMaterials} setElement={setElement}/>                        
                            }    
                        </section>
                    </div>
                </div>
            }
        </>
    )
}
