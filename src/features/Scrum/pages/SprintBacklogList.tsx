import React, { useContext, useEffect, useState } from 'react';

import { SprintBacklogContainer } from '../organisms/SprintBacklogContainer';
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout';
import { SprintContext } from '../../../services/contexts/scrum/SprintContext';
import { SprintBacklogContext } from '../../../services/contexts/scrum/SprintBacklogContext';
import { ProductBacklogContext } from '../../../services/contexts/scrum/ProductBacklogContext';


export const SprintBacklogList: React.FC = () => {
  const { sprintData, getSprintList } = useContext(SprintContext);
  const { productBacklogData, getProductBacklogCorrespondingList } = useContext(ProductBacklogContext);
  const { getSprintBacklogNotCorrespondingSprintList, getSprintBacklogList, removeAllSprintBacklogState } = useContext(SprintBacklogContext);
  // formState
  const [correspondingSprint, setCorrespondingSprint] = useState<string | undefined>(undefined);
  const [correspondingProductBacklog, setCorrespondingProductBacklog] = useState<string | undefined>(undefined);


  useEffect(() => {
    const fetchSprints = () => {
      getSprintList();
    };
    fetchSprints();
  }, []);

  useEffect(() => {
    const fetchProductBacklogs = () => {
      getProductBacklogCorrespondingList(correspondingSprint!);
    };
    fetchProductBacklogs();
  }, [correspondingSprint]);

  const handleCreate = () => {
    const editTab = window.open(`/sprint-backlog-list/create/`, '_blank');
    editTab?.addEventListener('beforeunload', () => {
      window.focus();
      if (!correspondingSprint) return;
      removeAllSprintBacklogState();
      if (correspondingSprint === 'noCorrespondingSprint') {
        getSprintBacklogNotCorrespondingSprintList(correspondingProductBacklog);
      } else {
        // TODO: ここで対応スプリントのバックログを取得する
        getSprintBacklogList(correspondingSprint, correspondingProductBacklog);
      }
    });
  }

  return (
    <DefaultLayout>
      <div>
        <label htmlFor="sprint-name" className="block text-sm font-medium leading-6 text-gray-900">
          対応スプリント
        </label>
        <div className="mt-2">
          <div className='flex justify-between'>
            <select className="block w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
              value={correspondingSprint}
              onChange={(e) => setCorrespondingSprint(e.target.value)}
            >
              <option value={undefined}></option>
              <option value={'noCorrespondingSprint'}>紐付けなし</option>
              {sprintData && sprintData.length > 0 && (
                sprintData.map((sprint, index) => (
                  <option key={index} value={sprint.sprintId}>{sprint.name}</option>
                ))
              )}
            </select>
            <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleCreate}
            >
              アイテム作成
            </button>
          </div>
          {correspondingSprint && (
            <>
              <label htmlFor="sprint-name" className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                対応プロダクトバックログ
              </label>
              <div className="mt-2">
                <select className="block w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
                  value={correspondingProductBacklog}
                  onChange={(e) => setCorrespondingProductBacklog(e.target.value)}
                  >
                  <option value={undefined}></option>
                  <option value={'noCorrespondingSprint'}>紐付けなし</option>
                  {productBacklogData && productBacklogData.length > 0 && (
                    productBacklogData.map((productBacklog, index) => (
                      <option key={index} value={productBacklog.productBacklogId}>{productBacklog.title}</option>
                    ))
                  )}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
      {correspondingSprint && (
        <div className="pt-6">
          <p className='text-xl font-bold'></p>
          <div className='pt-6'>
            <SprintBacklogContainer correspondingSprintId={correspondingSprint} correspondingProductBacklogId={correspondingProductBacklog} />
          </div>
        </div>
      )}
    </DefaultLayout>
  )
}

