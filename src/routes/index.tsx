import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthRoute } from "./authRoute";
import { NotFound } from '../features/NotFound/NotFound';
import { Login } from '../features/Login/pages/Login';
import { SprintList } from '../features/Scrum/pages/SprintList';
import { UserList } from '../features/User/pages/UserList';
import { ProductBacklogList } from '../features/Scrum/pages/ProductBacklogList';
import { SprintBacklogList } from '../features/Scrum/pages/SprintBacklogList';
import { SprintProvider } from '../services/providers/scrum/SprintProvider';
import { SprintBacklogEdit } from '../features/Scrum/pages/SprintBacklogEdit';
import { SprintBacklogCreate } from '../features/Scrum/pages/SprintBacklogCreate';
import { SprintBacklogProvider } from '../services/providers/scrum/SprintBacklog';
import { ProductBacklogProvider } from '../services/providers/scrum/ProductBacklog';


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
        <Route path='/sprint-backlog-list' element={<AuthRoute><SprintProvider><ProductBacklogProvider><SprintBacklogProvider><SprintBacklogList /></SprintBacklogProvider></ProductBacklogProvider></SprintProvider></AuthRoute>} />
        <Route path='/sprint-backlog-list/create' element={<AuthRoute><SprintBacklogCreate /></AuthRoute>} />
        <Route path='/sprint-backlog-list/edit/:sprintBacklogId' element={<AuthRoute><SprintBacklogEdit /></AuthRoute>} />
        {/* user */}
        <Route path="/users" element={<AuthRoute><UserList /></AuthRoute>} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
