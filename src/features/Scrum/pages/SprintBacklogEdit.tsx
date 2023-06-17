import React from 'react';

import Header from '../../../common/_components/_organisms/Header';
import { SprintBacklogEditor } from '../organisms/SprintBacklogEditor';
import { SprintProvider } from '../../../services/providers/scrum/SprintProvider';
import { UserProvider } from '../../../services/providers/user/UserProvider';
import { useParams } from 'react-router-dom';
import { SprintBacklogProvider } from '../../../services/providers/scrum/SprintBacklog';


export const SprintBacklogEdit: React.FC = () => {
  const param = useParams();
  const sprintBacklogId: string = param.sprintBacklogId as string;

  return (
    <>
      <SprintProvider>
        <UserProvider>
          <SprintBacklogProvider>
            <div className="h-full">
              <Header />
              <main className='bg-gray-100 h-full'>
                <div className='mx-auto w-10/12'>
                  <SprintBacklogEditor isCreate={false} sprintBacklogId={sprintBacklogId} />
                </div>
              </main>
            </div>
          </SprintBacklogProvider>
        </UserProvider>
      </SprintProvider>
    </>
  )
}