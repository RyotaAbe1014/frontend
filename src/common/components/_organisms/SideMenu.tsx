import React from 'react'

const SideMenu: React.FC = () => {
  return (
    <aside className="h-screen w-2/12 bg-white p-6 shadow">
      <div className="menu">
        <p className="mt-2 rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>プロダクトバックログ</button>
        </p>
        <p className="rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>スプリント</button>
        </p>
        <p className="mt-2 rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>スプリントバックログ</button>
        </p>
        <p className="mt-2 rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>ユーザ管理</button>
        </p>
      </div>
    </aside>
  )
}

export default SideMenu