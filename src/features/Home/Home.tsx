import React from 'react'

export const Home: React.FC = () => {
  return (

    <div className="h-screen">
      <header className="bg-white py-4 shadow">
        <div className="flex items-center justify-between">
          <button className="ml-5 text-indigo-600 hover:text-indigo-900 focus:outline-none">HOME</button>
          <div className="mr-5 flex items-center">
            <span className="mr-3 text-gray-700">Your Name</span>
            <button className="text-indigo-600 hover:text-indigo-900 focus:outline-none">Logout</button>
          </div>
        </div>
      </header>
      <div className="flex">
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
        <main className="w-10/12 bg-gray-100 p-8">
          <h1>Home!</h1>
        </main>
      </div>
    </div>


  );
};

export default Home;
