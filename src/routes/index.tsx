import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthRoute } from "./authRoute";
import { Home } from '../features/Home/Home';
import { About } from '../features/About/About';
import { NotFound } from '../features/NotFound/NotFound';
import { Login } from '../features/Login/pages/Login';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
        <Route path="/about" element={<About />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
