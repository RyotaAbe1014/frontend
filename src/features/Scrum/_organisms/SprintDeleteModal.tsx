import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { BaseModal } from '../../../common/_components/_organisms/BaseModal';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SprintDeleteModal: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen } = props;

  return (
    <>
      <BaseModal showModal={isOpen} setShowModal={setIsOpen}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">スプリント削除</h2>
          <button className="text-gray-500 hover:text-gray-400" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>
      </BaseModal>
    </>
  )
}
