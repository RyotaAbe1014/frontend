import React from 'react'
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout'
import { SprintListTable } from '../organisms/SprintListTable'
import { ProductBacklogListTable } from '../organisms/ProductBacklogListTable'

export const ProductBacklogList: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <div className="flex justify-end">
          <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
            新規バックログアイテム作成
          </button>
        </div>
        <ProductBacklogListTable />
      </DefaultLayout>
    </>
  )
}
