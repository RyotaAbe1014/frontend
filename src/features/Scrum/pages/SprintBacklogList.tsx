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
          <p>プロジェクトバックログ1</p>
          <SprintBacklogContainer correspondingSprintId={correspondingSprint} />
        </div>
      )}

    </DefaultLayout>
  )
}

