import React, { useState, useEffect } from 'react'
import { BaseModal } from '../../../common/_components/_organisms/BaseModal';
import { FaTimes } from 'react-icons/fa';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
}

export const UserEditModal: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen, isCreate } = props;
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (!isCreate) {
      // TODO: Set User info
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreate) {
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <>
      <BaseModal showModal={isOpen} setShowModal={setIsOpen}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">{isCreate ? 'ユーザーを追加する' : 'ユーザー編集'}</h2>
          <button className="text-gray-500 hover:text-gray-400" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              ユーザー名
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-1.5 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              メールアドレス
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-1.5 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
