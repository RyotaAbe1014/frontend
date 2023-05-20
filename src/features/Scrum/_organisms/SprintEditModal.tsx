import React, { useState, useContext } from 'react'
import { BaseModal } from '../../../common/components/_organisms/BaseModal';
import { FaTimes } from 'react-icons/fa';
import { SprintContext } from '../../../services/contexts/scrum/SprintContext';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
}

export const SprintEditModal: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen, isCreate } = props;
  const [sprintName, setSprintName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const { createSprint } = useContext(SprintContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreate) {
      createSprint(sprintName, startDate, endDate);
      setIsOpen(false);
    }
  }

  return (
    <>
      <BaseModal showModal={isOpen} setShowModal={setIsOpen}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">{isCreate ? 'スプリント作成' : 'スプリント編集'}</h2>
          <button className="text-gray-500 hover:text-gray-400" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sprint-name" className="block text-sm font-medium leading-6 text-gray-900">
              スプリント名
            </label>
            <div className="mt-2">
              <input
                id="sprint-name"
                name="sprint-name"
                type="text"
                autoComplete="sprint-name"
                required
                onChange={(e) => setSprintName(e.target.value)}
                className="block w-full px-3 py-1.5 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
              開始日
            </label>
            <div className="mt-2">
              <input
                id="start-date"
                name="start-date"
                type="date"
                autoComplete="start-date"
                required
                className="block w-full px-3 py-1.5 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
              終了日
            </label>
            <div className="mt-2">
              <input
                id="end-date"
                name="end-date"
                type="date"
                autoComplete="end-date"
                required
                className="block w-full px-3 py-1.5 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setEndDate(e.target.value)}
              />
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
