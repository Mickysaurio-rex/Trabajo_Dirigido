import * as React from 'react';

export default function Search_input() {
    return (
        <form class="max-w-lg mx-auto">
            <div class="flex">
                <div class="relative w-full">
                    <input type="search" id="search-dropdown" class="block h-[10vh] min-h-[60px] rounded-s-full py-2.5 px-5 w-full z-20 bg-black/50 text-white text-[16px] lg:text-[24px] backdrop-blur-sm rounded-e-full  focus:ring-blue-500 placeholder:font-bold placeholder:lg:text-[24px] placeholder:text-[16px]  placeholder:text-white" placeholder="Buscar..." required />
                    <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#F6BF49] rounded-full">
                        <svg class="w-6 h-6 text-[#785200]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    )
}