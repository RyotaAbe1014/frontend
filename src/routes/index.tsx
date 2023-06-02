import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthRoute } from "./authRoute";
import { NotFound } from '../features/NotFound/NotFound';
import { Login } from '../features/Login/pages/Login';
import { SprintList } from '../features/Scrum/pages/SprintList';
import { UserList } from '../features/User/pages/UserList';
import { ProductBacklogList } from '../features/Scrum/pages/ProductBacklogList';
import { SprintBacklogList } from '../features/Scrum/pages/SprintBacklogList';
import { Sample } from '../features/Scrum/pages/Sample';
import Sample2 from '../features/Scrum/pages/Sample2';
import { SprintProvider } from '../services/providers/scrum/SprintProvider';


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        {/* Home */}
        <Route path="/" element={<AuthRoute><ProductBacklogList /></AuthRoute>} />
        {/* scrum */}
        <Route path='/sprint-list' element={<AuthRoute><SprintList /></AuthRoute>} />
        <Route path='/product-backlog-list' element={<AuthRoute><ProductBacklogList /></AuthRoute>} />
        <Route path='/sprint-backlog-list' element={<AuthRoute><SprintProvider><SprintBacklogList /></SprintProvider></AuthRoute>} />
        {/* user */}
        <Route path="/users" element={<AuthRoute><UserList /></AuthRoute>} />

        {/* sample */}
        <Route path="/sample" element={<Sample />} />
        <Route path="/sample2" element={<Sample2 />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
