import React, { useEffect } from 'react'
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout'
import UserListTable from '../organisms/UserListTable'
import { UserProvider } from '../../../services/providers/user/UserProvider'

import { User } from '../../../types/user/user';
import { useNavigate } from 'react-router-dom';

export const UserList: React.FC = () => {

  const navigate = useNavigate();

  const storage_user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const user: User = storage_user.user;

  useEffect(() => {
    if (!user.isStaff) {
      navigate("/")
    }
  }, [])

  return (
    <>
      <UserProvider>
        <DefaultLayout >
          <UserListTable />
        </DefaultLayout>
      </UserProvider>
    </>
  )
}
