import { useNavigate } from "react-router-dom"

export default function Card_selector_category({ tittle }) {

const navigate = useNavigate();

    const handle = () => {
        navigate('../materiales_selec')
    }
    return (
        <div className="bg-gradient-to-br from-[#FFE09E] to-[#F6BF49] w-[100%] md:w-[80%] lg:w-[80%] min-h-[220px] h-[35vh] rounded-[30px] p-5 drop-shadow-lg">
            <div className="w-full h-full border-4 border-[#785200] flex flex-col justify-around items-center" >
                <h2 className="text-[20px] md:text-[26px] lg:text-[30px] font-bold text-[#785200] uppercase text-center">
                    {tittle}
                </h2>
                <button 
                type='button'
                onClick={handle}
                className="bg-[#785200] rounded-[20px] w-[35%] h-[25%] flex flex-row justify-center items-center gap-5 text-[#FACE71] transition hover:scale-110 hover:shadow-xl p-2">
                    <p className="font-bold text-[14px] md:text-[16px] lg:text-[20px]">Vamos</p>
                    <span class="iconify mdi--arrow-right-circle scale-150"></span>
                </button>
            </div>
        </div>
    )
}