import React from 'react';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const BaseModal: React.FC<Props> = ({ showModal, setShowModal, children }) => {
  return (
    <>
      {showModal ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowModal(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}