import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { Sprint } from '../../../types/scurm/sprint';
import { SprintContext } from '../../../services/contexts/scrum/SprintContext';
import { SprintDeleteModal } from './SprintDeleteModal';


export const SprintListTable: React.FC = () => {
  const { data, getSprints } = useContext(SprintContext);
  const [showDeleteModal, setshowDeleteModal] = useState<boolean>(false)

  useEffect(() => {
    getSprints();
  }, []);

  return (
    <>
    {/* 削除モーダル */}
    <SprintDeleteModal isOpen={showDeleteModal} setIsOpen={setshowDeleteModal} />

      <div className=" bg-gray-100 flex bg-gray-100 font-sans overflow-auto h-screen">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6 overflow-auto h-screen">
            <table className="min-w-max w-full table-auto">
              <thead className="sticky top-0 bg-gray-200">
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">スプリント名</th>
                  <th className="py-3 px-6 text-left">開始日</th>
                  <th className="py-3 px-6 text-left">終了日</th>
                  <th className="py-3 px-6 text-left">作成日</th>
                  <th className="py-3 px-6 text-left">更新日</th>
                  <th className="py-3 px-6 text-left">最終更新者</th>
                  <th className="py-3 px-6 text-left">アクション</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data && data.length > 0 ? (
                  <>
                    {data.map((sprint: Sprint) => (
                      <tr key={sprint.sprintId} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex text-left">
                            <span className="font-medium">{sprint.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{sprint.startDate}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{sprint.endDate}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{sprint.createdAt.split('T')[0]}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{sprint.updatedAt.split('T')[0]}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{sprint.updatedBy}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center space-x-4">
                            <button>
                              <FaEdit className="text-blue-400 hover:text-blue-600 cursor-pointer" size={20} />
                            </button>
                            <button onClick={() => setshowDeleteModal(true)}>
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
                      <td colSpan={7} className="py-3 px-6 text-center">スプリントが見つかりませんでした</td>
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
