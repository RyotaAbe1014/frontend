import React from 'react';

import Header from '../../../common/_components/_organisms/Header';
import { SprintBacklogEditor } from '../organisms/SprintBacklogEditor';
import { SprintProvider } from '../../../services/providers/scrum/SprintProvider';
import { UserProvider } from '../../../services/providers/user/UserProvider';


export const SprintBacklogCreate: React.FC = () => {
  return (
    <>
      <SprintProvider>
        <UserProvider>
          <div className="h-full">
            <Header />
            <main className='bg-gray-100 h-full'>
              <div className='mx-auto w-10/12'>
                <SprintBacklogEditor isCreate={true} />
              </div>
            </main>
          </div>
        </UserProvider>
      </SprintProvider>
    </>
  )
}