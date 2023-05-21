import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { SprintContext } from '../../../services/contexts/scrum/SprintContext';
import { BaseModal } from '../../../common/_components/_organisms/BaseModal';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sprintId: string;
  sprintName: string | undefined;
}

export const SprintDeleteModal: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen, sprintId, sprintName } = props;
  const { deleteSprint } = React.useContext(SprintContext);

  const handleDelete = () => {
    deleteSprint(sprintId);
    setIsOpen(false);
  }

  return (
    <>
      <BaseModal showModal={isOpen} setShowModal={setIsOpen}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">スプリント削除</h2>
          <button className="text-gray-500 hover:text-gray-400" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <p className="mb-3 pt-8 text-center">{sprintName} を削除しますか？</p>
        <div className="flex justify-center items-center pt-8">
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleDelete()}> 削除 </button>
          <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded" onClick={() => setIsOpen(false)}> キャンセル </button>
        </div>
      </BaseModal>
    </>
  )
}
