import React, { useState, useContext, useEffect, ChangeEvent } from 'react'
import { BaseModal } from '../../../common/_components/_organisms/BaseModal';
import { FaTimes } from 'react-icons/fa';
import { SprintContext } from '../../../services/contexts/scrum/SprintContext';
import { Sprint } from '../../../types/scurm/sprint';
import { PuroductBacklogContext } from '../../../services/contexts/scrum/PuroductBacklogContext';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
}

export function ProductBacklogEditModal(props: Props): JSX.Element {
  const { isOpen, setIsOpen, isCreate } = props;
  const { sprintData, getSprintList } = useContext(SprintContext);
  const { createProductBacklog } = useContext(PuroductBacklogContext);

  // formState
  const [backLogItemTitle, setBackLogItemTitle] = useState<string>('');
  const [correspondingSprint, setCorrespondingSprint] = useState<string | undefined>(undefined);
  const [backLogItemDescription, setBackLogItemDescription] = useState<string>('');


  useEffect(() => {
    const fetchSprints = async () => {
      await getSprintList();
    };
    fetchSprints();
  }, [getSprintList]);

  const handleCorrespondingSprintChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCorrespondingSprint(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreate) {
      createProductBacklog(backLogItemTitle, backLogItemDescription, correspondingSprint);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <>
      <BaseModal showModal={isOpen} setShowModal={setIsOpen}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">{isCreate ? 'バックログアイテム作成' : 'バックログアイテム編集'}</h2>
          <button className="text-gray-500 hover:text-gray-400" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sprint-name" className="block text-sm font-medium leading-6 text-gray-900">
              タイトル名
            </label>
            <div className="mt-2">
              <input
                id="sprint-name"
                name="sprint-name"
                type="text"
                autoComplete="sprint-name"
                value={backLogItemTitle}
                required
                onChange={(e) => setBackLogItemTitle(e.target.value)}
                className="block w-full px-3 py-1.5 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="sprint-name" className="block text-sm font-medium leading-6 text-gray-900">
              対応スプリント
            </label>
            <div className="mt-2">
              <select className="block w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleCorrespondingSprintChange(e)}>
                <option value={undefined}>紐付けなし</option>
                {sprintData && sprintData.length > 0 && (
                  sprintData.map((sprint, index) => (
                    <option key={index} value={sprint.sprintId}>{sprint.name}</option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="sprint-name" className="block text-sm font-medium leading-6 text-gray-900">
              メモ
            </label>
            <div className="mt-2">
              <textarea className="w-full h-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={backLogItemDescription}
                onChange={(e) => setBackLogItemDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500"
            >
              {isCreate ? '作成' : '更新'}
            </button>
          </div>
        </form>
      </BaseModal>
    </>
  )
}
