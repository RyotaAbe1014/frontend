import React from 'react'
import { BaseModal } from '../../../common/components/_organisms/BaseModal';

import { FaTimes } from 'react-icons/fa';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
}

export const SprintEditModal: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen, isCreate } = props;

  return (
    <>
      <BaseModal showModal={isOpen} setShowModal={setIsOpen}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">{isCreate ? 'スプリント作成' : 'スプリント編集'}</h2>
          <button className="text-gray-500 hover:text-gray-400" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>
      </BaseModal>
    </>
  )
}
