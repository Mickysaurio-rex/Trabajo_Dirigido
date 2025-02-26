import * as React from 'react';
import Search_input from '../../components/generalComponents/Search_Input';
import Card_selector_material from '../../components/material_components/Card_selector_material';
import Card_info_material from '../../components/material_components/modal_card_info/Card_info_material';

export default function Material_selector_page() {
    const [stateModal, setStateModal] = React.useState(false)
    const [elementModal, setElementModal] = React.useState(null)
    const [materials, setMaterials] = React.useState([])
    const [search, setSearch] = React.useState("")

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    React.useEffect(() => {
        setMaterials(elements)
    }, [])


    const results = !search ? materials : materials.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()))

    const elements = [
        { name: 'Cierra', info: 'La mejor cierra del mundo mundial capaz de cortar hasta el aire', code: '27hg23', mark: 'Toyota', year: '2001', estante: 'B1' },
        { name: 'MartilloX', info: 'Un martillo irrompible para cualquier construcción, con fuerza de tres dioses del olimpo y 45 cabras locas, además de mango antiderrapante y 100 colores', code: '88mk45', mark: 'Stanley', year: '2015', estante: 'C3' },
        { name: 'DestornilladorPro', info: 'Destornillador magnético de precisión', code: '66dt89', mark: 'Bosch', year: '2018', estante: 'A2' },
        { name: 'TaladroMax', info: 'Taladro inalámbrico de alto rendimiento', code: '99tl12', mark: 'Makita', year: '2020', estante: 'D4' },
        { name: 'Llave Inglesa', info: 'Llave ajustable de acero inoxidable', code: '45li67', mark: 'Black & Decker', year: '2019', estante: 'B2' },
        { name: 'Sierra Circular', info: 'Sierra circular con disco de diamante', code: '12sc34', mark: 'Dewalt', year: '2017', estante: 'E1' },
        { name: 'Compresor AirMax', info: 'Compresor de aire portátil', code: '78ca90', mark: 'Hitachi', year: '2021', estante: 'F3' },
        { name: 'Soldador Ultra', info: 'Equipo de soldadura con arco eléctrico', code: '56su23', mark: 'Lincoln Electric', year: '2016', estante: 'G5' },
        { name: 'Escalera Extensible', info: 'Escalera de aluminio de 4 metros', code: '34ee56', mark: 'Werner', year: '2014', estante: 'H2' },
        { name: 'Amoladora Xtreme', info: 'Amoladora angular con disco de corte', code: '91ax78', mark: 'Metabo', year: '2013', estante: 'J1' }
    ];

    return (
        <>
            <div className="flex flex-col gap-4 relative px-2 md:px-0 lg:px-0 min-h-[100vh]">
                <section className='flex flex-row gap-3'>
                    <div className="w-[50%] place-content-center">
                        <Search_input function_search={searcher} />
                    </div>
                    <div className="w-[50%] flex flex-col md:flex-row lg:flex-row justify-around gap-2">
                        <button className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#00224E] rounded-[20px] shadow-lg md:w-[40%] lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl text-white'>
                            Agregar
                        </button>
                        <button className='font-medium text-[20px] lg:text-[28px] min-h-[60px] bg-[#F6BF41] rounded-[20px] shadow-lg md:w-[40%] lg:w-[40%] h-[4vw] transition hover:scale-110 hover:shadow-xl'>
                            Reservar
                        </button>
                    </div>
                </section>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center place-content-center gap-y-5 '>
                    {results.map((element, index) => (
                        <Card_selector_material key={index} tittle={element.name} info={element.info} button_function={() => { setStateModal(true); setElementModal(element); }} />
                    ))}
                </section>
            </div>
            <Card_info_material state={stateModal} setStateModal={setStateModal} element={elementModal} />
        </>
    )
}
