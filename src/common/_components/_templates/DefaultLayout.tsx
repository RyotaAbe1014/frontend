import React from 'react'
import Header from '../_organisms/Header'
import SideMenu from '../_organisms/SideMenu'

interface Props {
  children: React.ReactNode
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex">
        <SideMenu />
        <main className="w-10/12 bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
