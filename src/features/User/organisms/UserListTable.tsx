import React from 'react'
import { User } from '../../../types/user/user'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const UserListTable = () => {

  // TODO: 後々削除　テスト用データ
  const userData: User[] = [
    {
      id: '01',
      username: 'test_user',
      email: 'test_email',
      isActive: true,
      isStaff: true,
      createdAt: '2023-05-22T14:56:36.585364Z',
      updatedAt: '2023-05-22T14:56:36.585364Z'
    },
    {
      id: '02',
      username: 'test_user',
      email: 'test_email',
      isActive: true,
      isStaff: true,
      createdAt: '2023-05-22T14:56:36.585364Z',
      updatedAt: '2023-05-22T14:56:36.585364Z'
    }
  ]

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
                  <th className="py-3 px-6 text-left">アクション</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {userData && userData.length > 0 ? (
                  <>
                    {userData.map((user: User, index) => (
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
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center space-x-4">
                            <button>
                              {/* <button onClick={() => handleEdit(user.id, user.username, user.createdAt, user.updatedAt)}> */}
                              <FaEdit className="text-blue-400 hover:text-blue-600 cursor-pointer" size={20} />
                            </button>
                            {/* <button onClick={() => handleDelete(user.id, user.username)}> */}
                            <button>
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
                      <td colSpan={7} className="py-3 px-6 text-center">ユーザーが見つかりませんでした</td>
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

export default UserListTable