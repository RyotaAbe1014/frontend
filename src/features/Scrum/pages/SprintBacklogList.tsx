import React, { useContext, useEffect } from 'react';

import Sample2 from './Sample2';
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout';
import { SprintContext } from '../../../services/contexts/scrum/SprintContext';


export const SprintBacklogList: React.FC = () => {
  const { sprintData, getSprintList } = useContext(SprintContext);

  useEffect(() => {
    const fetchSprints = async () => {
      await getSprintList();
    };
    fetchSprints();
    console.log('sprintData', sprintData);
  }, [getSprintList]);

  return (
    <DefaultLayout>
      <div>
        <label htmlFor="sprint-name" className="block text-sm font-medium leading-6 text-gray-900">
          対応スプリント
        </label>
        <div className="mt-2">
          <select className="block w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/4">
            <option value={undefined}>選択してください</option>
            {sprintData && sprintData.length > 0 && (
              sprintData.map((sprint, index) => (
                <option key={index} value={sprint.sprintId}>{sprint.name}</option>
              ))
            )}
          </select>
        </div>
      </div>
      <div className="max-h-screen overflow-x-scroll">
        <p>プロジェクトバックログ1</p>
        <Sample2 />
        <p>プロジェクトバックログ2</p>
        <Sample2 />
        <p>プロジェクトバックログ3</p>
        <Sample2 />
      </div>
    </DefaultLayout>
  )
}

