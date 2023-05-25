import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { Sprint } from '../../../types/scurm/sprint';
import { SprintContext } from '../../../services/contexts/scrum/SprintContext';
import { SprintDeleteModal } from './SprintDeleteModal';
import { SprintEditModal } from './SprintEditModal';


export const SprintListTable: React.FC = () => {
  const { sprintData, getSprintList } = useContext(SprintContext);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [sprintId, setSprintId] = useState<string>('');
  const [sprintName, setSprintName] = useState<string | undefined>('');
  const [sprintStartDate, setSprintStartDate] = useState<string>('');
  const [sprintEndDate, setSprintEndDate] = useState<string>('');

  useEffect(() => {
    getSprintList();
  }, []);

  const handleDelete = (sprintId: string, sprintName: string | undefined) => {
    setSprintId(sprintId);
    setSprintName(sprintName);
    setShowDeleteModal(true);
  }

  const handleEdit = (sprintId: string, sprintName: string | undefined, sprintStartDate: string, sprintEndDate: string) => {
    setSprintId(sprintId);
    setSprintName(sprintName);
    setSprintStartDate(sprintStartDate);
    setSprintEndDate(sprintEndDate);
    setShowEditModal(true);
  }

  return (
    <>
      {/* 削除モーダル */}
      <SprintDeleteModal isOpen={showDeleteModal} setIsOpen={setShowDeleteModal} sprintId={sprintId} sprintName={sprintName}/>
      {/* 更新モーダル */}
      <SprintEditModal isOpen={showEditModal} setIsOpen={setShowEditModal} isCreate={false} sprintId={sprintId} sprintName={sprintName} sprintStartDate={sprintStartDate} sprintEndDate={sprintEndDate}/>
      {/* テーブル */}
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
                {sprintData && sprintData.length > 0 ? (
                  <>
                    {sprintData.map((sprint: Sprint, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
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
                            <button onClick={() => handleEdit(sprint.sprintId, sprint.name, sprint.startDate, sprint.endDate)}>
                              <FaEdit className="text-blue-400 hover:text-blue-600 cursor-pointer" size={20} />
                            </button>
                            <button onClick={() => handleDelete(sprint.sprintId, sprint.name)}>
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
