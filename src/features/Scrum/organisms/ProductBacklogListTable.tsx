import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ProductBacklog } from '../../../types/scrum/productBacklog';
import { ProductBacklogProgress } from '../../../types/scrum/productBacklogProgress';
import { ProductBacklogContext } from '../../../services/contexts/scrum/ProductBacklogContext';
import { ProductBacklogEditModal } from './ProductBacklogEditModal';
import { ProductBacklogDeleteModal } from './ProductBacklogDeleteModal';

export const ProductBacklogListTable: React.FC = () => {
  const { productBacklogData, getProductBacklogList } = useContext(ProductBacklogContext);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [productBacklog, setProductBacklog] = useState<ProductBacklog>();

  const [productBacklogId, setProductBacklogId] = useState<string>('');
  const [productBacklogTitle, setProductBacklogTitle] = useState<string>('');

  useEffect(() => {
    getProductBacklogList();
  }, []);

  const handleDelete = (productBacklogId: string, productBacklogTitle: string) => {
    setProductBacklogId(productBacklogId);
    setProductBacklogTitle(productBacklogTitle);
    setShowDeleteModal(true);
  }

  const handleEdit = (productBacklog: ProductBacklog) => {
    setProductBacklog(productBacklog);
    setShowEditModal(true);
  }

  return (
    <>
      {/* 削除モーダル */}
      <ProductBacklogDeleteModal isOpen={showDeleteModal} setIsOpen={setShowDeleteModal} productBacklogId={productBacklogId} productBacklogTitle={productBacklogTitle}/>
      {/* 詳細、更新モーダル */}
      <ProductBacklogEditModal isOpen={showEditModal} setIsOpen={setShowEditModal} productBacklog={productBacklog} isCreate={false} />
      {/* テーブル */}
      <div className=" bg-gray-100 flex bg-gray-100 font-sans overflow-auto h-screen">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6 overflow-auto h-screen">
            <table className="min-w-max w-full table-auto">
              <thead className="sticky top-0 bg-gray-200">
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">バックログ名</th>
                  <th className="py-3 px-6 text-left">作業スプリント</th>
                  <th className="py-3 px-6 text-left">ステータス</th>
                  <th className="py-3 px-6 text-left">作成日</th>
                  <th className="py-3 px-6 text-left">更新日</th>
                  <th className="py-3 px-6 text-left">最終更新者</th>
                  <th className="py-3 px-6 text-left">アクション</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {productBacklogData && productBacklogData.length > 0 ? (
                  <>
                    {productBacklogData.map((productBacklog: ProductBacklog, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex text-left">
                            <span className="font-medium">{productBacklog.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{productBacklog.sprint?.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            {productBacklog.progress === ProductBacklogProgress.NOT_STARTED ? (
                              <span className="inline-block bg-blue-200 text-blue-800 px-4 py-2 rounded-full">not started</span>
                            ) : productBacklog.progress === ProductBacklogProgress.STARTED ? (
                              <span className="inline-block bg-green-200 text-green-800 px-4 py-2 rounded-full">started</span>
                            ) : productBacklog.progress === ProductBacklogProgress.HALF_WAY ? (
                              <span className="inline-block bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full">half way</span>
                            ) : productBacklog.progress === ProductBacklogProgress.ALMOST_DONE ? (
                              <span className="inline-block bg-orange-200 text-orange-800 px-4 py-2 rounded-full">almost done</span>
                            ) : productBacklog.progress === ProductBacklogProgress.COMPLETED ? (
                              <span className="inline-block bg-purple-200 text-purple-800 px-4 py-2 rounded-full">completed</span>
                            ) : (
                              <span className="inline-block bg-red-200 text-red-800 px-4 py-2 rounded-full">archived</span>
                            )
                            }
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{productBacklog.createdAt.split('T')[0]}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{productBacklog.updatedAt.split('T')[0]}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{productBacklog.updatedBy}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center space-x-4">
                            <button onClick={() => handleEdit(productBacklog)}>
                              <FaEdit className="text-blue-400 hover:text-blue-600 cursor-pointer" size={20} />
                            </button>
                            <button onClick={() => handleDelete(productBacklog.productBacklogId, productBacklog.title)}>
                              <FaTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer" size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )
                  : (
                    <tr>
                      <td colSpan={7} className="py-3 px-6 text-center">バックログアイテムが見つかりませんでした</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
