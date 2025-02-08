import * as React from 'react';
import Card_selector_laboratory from '../../components/laboratory_components/Card_selector_laboratory';

export default function Laboratory_page() {

    return (
        <div>
            <div className="flex flex-col items-center min-h-[100vh]">
                <Card_selector_laboratory />
            </div>
        </div>
    )
}