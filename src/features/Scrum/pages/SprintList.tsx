import React, { useState } from 'react'
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout';
import { SprintEditModal } from '../organisms/SprintEditModal';
import { SprintListTable } from '../organisms/SprintListTable';
import { SprintProvider } from '../../../services/providers/scrum/SprintProvider';



export const SprintList: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  return (
    <>
      <SprintProvider>
        {/* 作成モーダル */}
        <SprintEditModal isOpen={showCreateModal} setIsOpen={setShowCreateModal} isCreate={true} />

        <DefaultLayout>
          <div className="flex justify-end">
            <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setShowCreateModal(true)}  >
              スプリント作成
            </button>
          </div>
            <SprintListTable />
        </DefaultLayout>
      </SprintProvider>
    </>
  )
}
