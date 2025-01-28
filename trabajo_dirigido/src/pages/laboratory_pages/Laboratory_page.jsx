import * as React from 'react';
import Card_selector_laboratory from '../../components/laboratory_components/Card_selector_laboratory';
import Card_selector_material from '../../components/material_components/Card_selector_material';

export default function Laboratory_page() {

    return (
        <div>
            <div className="bg-[url('./public/UPB_30Anios.jpg')] bg-repeat bg-[length:400px_450px] w-screen h-screen md:px-16 lg:px-16 py-16 flex flex-col items-center gap-20 md:gap-30 lg:gap-40">
                <Card_selector_laboratory />
            </div>
        </div>
    )
}