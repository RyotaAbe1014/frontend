import React, { useEffect, useState } from 'react'
import { useSprint } from '../../../services/hooks/scrum/sprint/useSprint'
import { Sprint } from '../../../types/scurm/sprint';
import { DefaultLayout } from '../../../common/components/_templates/DefaultLayout';
import { BaseModal } from '../../../common/components/_organisms/BaseModal';
import { FaTimes } from 'react-icons/fa';
import { SprintEditModal } from '../_organisms/SprintEditModal';



export const SprintList: React.FC = () => {
  const { getSprints, sprints } = useSprint();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    getSprints();
  }, []);

  return (
    <>
      {/* 作成モーダル */}
      <SprintEditModal isOpen={showModal} setIsOpen={setShowModal} isCreate={true} />

      <DefaultLayout>
        <div className="flex justify-end">
          <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setShowModal(true)}  >
            スプリント作成
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className=" bg-gray-100 flex items-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
                    {sprints && (
                      <>
                        {sprints.map((sprint: Sprint) => (
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
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}
