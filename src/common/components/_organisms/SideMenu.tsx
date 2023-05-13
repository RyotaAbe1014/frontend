import React from 'react'

const SideMenu: React.FC = () => {
  return (
    <aside className="h-screen w-2/12 bg-white p-6 shadow">
      <div className="menu">
        <p className="rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>スプリント管理</button>
        </p>
        <p className="mt-2 rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>プロジェクト管理</button>
        </p>
        <p className="mt-2 rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>エピック管理</button>
        </p>
        <p className="mt-2 rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>バックログ管理</button>
        </p>
        <p className="mt-2 rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>タスク管理</button>
        </p>
        <p className="mt-2 rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          <button>ユーザ管理</button>
        </p>
      </div>
    </aside>
  )
}

export default SideMenu