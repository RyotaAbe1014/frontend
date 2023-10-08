import React, { useContext, useEffect, useState } from 'react'
import { User } from '../../../types/user/user';
import { UserContext } from '../../../services/contexts/user/UserContext';
import { Button } from '../../../common/_components/_atoms/Button/Button';
import { UserEditModal } from './UserEditModal';
import { FaPlus } from 'react-icons/fa';

const UserListTable: React.FC = () => {

  const { userData, getUserList } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getUserList();
  }, []);

  const handleModal = (): void => {
    setIsOpen(!isOpen);
  }


  return (
    <>
      {/* テーブル */}
      <div className=" bg-gray-100 flex bg-gray-100 font-sans overflow-auto h-screen">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6 overflow-auto h-screen">
            <table className="min-w-max w-full table-auto">
              <thead className="sticky top-0 bg-gray-200">
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ユーザー名</th>
                  <th className="py-3 px-6 text-left">メールアドレス</th>
                  <th className="py-3 px-6 text-left">作成日</th>
                  <th className="py-3 px-6 text-left">更新日</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                <>
                  {userData?.map((user: User, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex text-left">
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <span>{user.createdAt.split('T')[0]}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <span>{user.updatedAt.split('T')[0]}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
                <tr>
                  <td colSpan={7} className="py-3 px-6">
                    <Button onClick={handleModal} customClass='flex items-center mx-auto'>
                      <FaPlus />
                      <p className='ml-1'>ユーザーを追加する</p>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* モーダル */}
      <UserEditModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCreate={true}
      />
    </>
  )
}

export default UserListTable