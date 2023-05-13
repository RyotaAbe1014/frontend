import React from 'react'
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';

export const Home: React.FC = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex">
        <SideMenu />
        <main className="w-10/12 bg-gray-100 p-8">
          <h1>Home!</h1>
        </main>
      </div>
    </div>
  );
};

export default Home;
