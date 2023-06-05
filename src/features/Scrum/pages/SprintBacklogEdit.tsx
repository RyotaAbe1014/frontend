import React from 'react';
import Header from '../../../common/_components/_organisms/Header';

export const SprintBacklogEdit: React.FC = () => {
    return (
        <>
            <div className="h-screen">
                <Header />
                <main className='bg-gray-100'>
                <div className='mx-auto w-10/12 text-center'>
                    {/* ここにコンテンツを追加 */}
                    <h1 className='text-3xl font-bold'>SprintBacklogEdit</h1>
                </div>
                </main>
            </div>
        </>
    )
}