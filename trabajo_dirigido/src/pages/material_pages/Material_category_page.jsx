import Card_selector_category from "../../components/material_components/Card_selector_category"

export default function Material_category_page(){


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-y-10">
            {Array.from({length: 10}).map((_, index) => (
                <Card_selector_category tittle={'Herramientas'}/>
            ))}
        </div>
    )
}