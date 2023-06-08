import React, { useContext, useEffect, useState } from 'react';

import { SprintBacklogContainer } from './SprintBacklogContainer';
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout';
import { SprintContext } from '../../../services/contexts/scrum/SprintContext';


export const SprintBacklogList: React.FC = () => {
  const { sprintData, getSprintList } = useContext(SprintContext);

  // formState
  const [correspondingSprint, setCorrespondingSprint] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchSprints = async () => {
      await getSprintList();
    };
    fetchSprints();
  }, [getSprintList]);

  const handleCreate = () => {
    const editTab = window.open(`/sprint-backlog-list/create/`, '_blank');
    editTab?.addEventListener('beforeunload', () => {
      window.focus();
    });
  }
  
  return (
    <DefaultLayout>
      <div>
        <label htmlFor="sprint-name" className="block text-sm font-medium leading-6 text-gray-900">
          対応スプリント
        </label>
        <div className="mt-2">
          <select className="block w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
            placeholder='対応スプリント'
            value={correspondingSprint}
            onChange={(e) => setCorrespondingSprint(e.target.value)}
          >
            <option value={undefined}></option>
            {sprintData && sprintData.length > 0 && (
              sprintData.map((sprint, index) => (
                <option key={index} value={sprint.sprintId}>{sprint.name}</option>
              ))
            )}
          </select>
        </div>
      </div>
      {correspondingSprint && (
        <div className="max-h-screen overflow-x-scroll pt-6">
          <div className='flex justify-between'>
            <p className='text-xl font-bold'>プロジェクトバックログ1</p>
            <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleCreate}
            >
              アイテム作成
            </button>
          </div>
          <div className='pt-6'>
            <SprintBacklogContainer correspondingSprintId={correspondingSprint} />
          </div>
        </div>
      )}

    </DefaultLayout>
  )
}

