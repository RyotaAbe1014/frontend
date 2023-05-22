import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthRoute } from "./authRoute";
import { Home } from '../features/Home/Home';
import { NotFound } from '../features/NotFound/NotFound';
import { Login } from '../features/Login/pages/Login';
import { SprintList } from '../features/Scrum/pages/SprintList';
import { UserList } from '../features/User/pages/UserList';
import { ProductBacklogList } from '../features/Scrum/pages/ProductBacklogList';
import { SprintBacklogList } from '../features/Scrum/pages/SprintBacklogList';


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        {/* Home */}
        <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
        {/* scrum */}
        <Route path='/sprint-list' element={<AuthRoute><SprintList /></AuthRoute>}/>
        <Route path='/product-backlog-list' element={<AuthRoute><ProductBacklogList /></AuthRoute>}/>
        <Route path='/sprint-backlog-list' element={<AuthRoute><SprintBacklogList /></AuthRoute>}/>
        {/* user */}
        <Route path="/users" element={<AuthRoute><UserList /></AuthRoute>} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
