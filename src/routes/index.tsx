import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthRoute } from "./authRoute";
import { Home } from '../features/Home/Home';
import { About } from '../features/About/About';
import { NotFound } from '../features/NotFound/NotFound';
import { Login } from '../features/Login/pages/Login';
import { SprintList } from '../features/Scrum/pages/SprintList';


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
        <Route path="/about" element={<About />} />

        {/* scrum */}
        <Route path='/scrum/sprint-list' element={<AuthRoute><SprintList /></AuthRoute>}/>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
