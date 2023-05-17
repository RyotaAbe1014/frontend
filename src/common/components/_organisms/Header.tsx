import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../services/hooks/auth/useAuth';
import { User } from '../../../types/user/user';


const Header: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate();
  const storage_user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const user: User = storage_user.user;

  const handleLogout = () => {
    logout();
  }

  const handleHome = () => {
    navigate('/');
  }

  return (
    <header className="bg-white py-4 shadow">
      <div className="flex items-center justify-between">
        <button className="ml-5 text-indigo-600 hover:text-indigo-900 focus:outline-none" onClick={() => handleHome()}>HOME</button>
        <div className="mr-5 flex items-center">
          <span className="mr-3 text-gray-700">{user.username}</span>
          <button className="text-indigo-600 hover:text-indigo-900 focus:outline-none" onClick={() => handleLogout()} >Logout</button>
        </div>
      </div>
    </header>
  )
}

export default Header