import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 shadow">
      <div className="flex items-center justify-between">
        <button className="ml-5 text-indigo-600 hover:text-indigo-900 focus:outline-none">HOME</button>
        <div className="mr-5 flex items-center">
          <span className="mr-3 text-gray-700">Your Name</span>
          <button className="text-indigo-600 hover:text-indigo-900 focus:outline-none">Logout</button>
        </div>
      </div>
    </header>
  )
}

export default Header