import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Classroom from './Classroom';
// auth
import Login from '../pages/auth/LoginPage';
import Register from '../pages/auth/RegisterPage';

import HomePage from '../pages/HomePage';
import TestPage from '../pages/TestPage';

import NotFoundPage from '../pages/NotFoundPage';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Base() {
  return (
    <main className="bg-zinc-800 h-full">
      <Router>
        <Header />
        <Routes>
          {/* header */}
          {/* home */}
          <Route path="/" element={<HomePage />} />
          {/* not found */}
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/test" element={<TestPage />} />
          {/* classroom */}
          <Route path="/classroom/*" element={<Classroom />} />
          {/* auth */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
}

export default Base;
