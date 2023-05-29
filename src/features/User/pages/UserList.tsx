import React from 'react'
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout'
import UserListTable from '../organisms/UserListTable'

export const UserList = () => {

  return (
    <>
      <DefaultLayout >
        <UserListTable />
      </DefaultLayout>
    </>
  )
}
