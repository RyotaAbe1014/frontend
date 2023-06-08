import React from 'react';

import Header from '../../../common/_components/_organisms/Header';
import { SprintBacklogEditor } from '../organisms/SprintBacklogEditor';


export const SprintBacklogCreate: React.FC = () => {
    return (
        <>
            <div className="h-full">
                <Header />
                <main className='bg-gray-100 h-full'>
                    <div className='mx-auto w-10/12'>
                        <SprintBacklogEditor isCreate={true} />
                    </div>
                </main>
            </div>
        </>
    )
}