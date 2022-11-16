/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ClassroomReportPage from '../pages/Classroom/ClassroomReportPage';
import ClassroomSalaPage from '../pages/Classroom/ClassroomSalaPage';
import ClassroomHomePage from '../pages/Classroom/ClassroomHomePage';
import ClassroomEditPage from '../pages/Classroom/ClassroomEditPage';
import ClassroomListPage from '../pages/Classroom/ClassroomListPage';
import ClassroomClassesPage from '../pages/Classroom/ClassroomClassesPage';
import ClassroomProfilePage from '../pages/Classroom/ClassroomProfilePage';

import NotFoundPage from '../pages/NotFoundPage';
import Dashboard from '../components/Dashboard';

import Logout from '../assets/svg/logout';
import { logout } from '../actions/userActions';

function Classroom() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    if (userInfo) {
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/auth/login');
    }
  }, [navigate, userInfo]);
  return (
    <main className="bg-zinc-800 h-full container mx-auto mb-56">
      <section className="grid grid-cols-12 gap-12 pt-32">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-8">
          <Dashboard />
          <button type="button" onClick={logoutHandler}>
            <div className="bg-zinc-900 px-8 py-4 rounded-lg shadow-md shadow-zinc-900 flex flex-row gap-2 cursor-pointer fill-white hover:fill-zinc-400 text-white hover:text-zinc-400">
              <Logout />
              <h1 className=" font-bold text-md tracking-normal">
                Cerrar sesión
              </h1>
            </div>
          </button>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <Routes>
            <Route index element={<ClassroomHomePage />} />
            <Route path="/reportes" element={<ClassroomReportPage />} />
            <Route path="/reporte/:id" element={<ClassroomSalaPage />} />
            <Route path="/estudiante/:id" element={<ClassroomEditPage />} />
            <Route path="/list" element={<ClassroomListPage />} />
            <Route path="/classes" element={<ClassroomClassesPage />} />
            <Route path="/profile" element={<ClassroomProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </section>
    </main>
  );
}

export default Classroom;
