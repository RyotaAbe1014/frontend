import React from 'react'
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout'
import UserListTable from '../organisms/UserListTable'
import { UserProvider } from '../../../services/providers/user/UserProvider'

export const UserList: React.FC = () => {

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
