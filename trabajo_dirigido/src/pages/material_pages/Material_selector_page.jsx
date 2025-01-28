import * as React from 'react';
import Search_input from '../../components/generalComponents/Search_Input';
import Card_selector_material from '../../components/material_components/Card_selector_material';
import Modal_card from '../../components/generalComponents/Modal_card';
import Card_info_material from '../../components/material_components/Card_info_material';

export default function Material_selector_page() {
    const cantidad = 8; // Número de veces que se repetirá el componente
  const componentes = [];
  const tittle1 = "Mezcladora"
  const info1 =  "Mezcladora de cemento lista para arreglar paredes"
  const [state, setState] = React.useState(false)

  // Usamos un bucle for para llenar el arreglo de componentes
  for (let i = 0; i < cantidad; i++) {
    componentes.push(<Card_selector_material key={i} tittle={tittle1} info={info1} button_function={() => setState(true)}  />);
  }
    return(
    <div className="bg-[url('./public/UPB_30Anios.jpg')] bg-repeat bg-[length:400px_450px] md:px-16 lg:px-16 py-16 flex flex-col gap-4">
        <section className='flex flex-row gap-3'>
            <div className="w-[50%] place-content-center">
                <Search_input />
            </div>
            <div className="w-[50%] flex flex-row gap-2">
                <button className='font-medium lg:text-[28px] min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                    Agregar
                </button>
                <button className='font-medium lg:text-[28px] min-h-[60px] bg-[#F6BF41] rounded-[20px] shadow-lg w-[45%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                    Reservar
                </button>
            </div>
        </section>
        <section className='grid grid-cols-3 place-items-center place-content-center gap-y-5 '>
            {componentes}
        </section>
        <Card_info_material state={state} close_function={() => setState(false)} material_name={tittle1} material_info={info1} name_arm={"Estante C"} number_inventory={"4"} />
    </div>
    )
}
