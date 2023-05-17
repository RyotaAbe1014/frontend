import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu: React.FC = () => {
  const links = [
    {
      label: 'プロダクトバックログ',
      to: '/productbacklog',
    },
    {
      label: 'スプリント',
      to: '/sprint-list',
    },
    {
      label: 'スプリントバックログ',
      to: '/sprintbacklog',
    },
    {
      label: 'ユーザ管理',
      to: '/user',
    },
  ];

  return (
    <aside className="h-screen w-2/12 bg-white p-6 shadow flex flex-col">
      <ul className="menu">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>
              <p className="mt-2 rounded-md px-4 py-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
                {link.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideMenu;