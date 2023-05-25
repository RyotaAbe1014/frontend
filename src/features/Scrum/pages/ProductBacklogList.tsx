import React, { useState } from 'react'
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout'
import { ProductBacklogListTable } from '../organisms/ProductBacklogListTable'
import { ProductBacklogEditModal } from '../organisms/ProductBacklogEditModal';
import { SprintProvider } from '../../../services/providers/scrum/SprintProvider';
import { ProductBacklogProvider } from '../../../services/providers/scrum/ProductBacklog';

export const ProductBacklogList: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  return (
    <>
      <DefaultLayout>
        <SprintProvider>
          <ProductBacklogProvider>
            <ProductBacklogEditModal isOpen={showCreateModal} setIsOpen={setShowCreateModal} isCreate={true} />
            <div className="flex justify-end">
              <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setShowCreateModal(true)}>
                新規バックログアイテム作成
              </button>
            </div>
            <ProductBacklogListTable />
          </ProductBacklogProvider>
        </SprintProvider>
      </DefaultLayout>

    </>
  )
}
