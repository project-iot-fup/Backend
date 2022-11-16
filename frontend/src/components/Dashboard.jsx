/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, Link } from 'react-router-dom';

import { getUserDetails } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

// icons
import UserBox from '../assets/svg/userBox';
import Calendar from '../assets/svg/calendar';
import Books from '../assets/svg/books';
import Reports from '../assets/svg/reports';
import Chart from '../assets/svg/chart';
import Inbox from '../assets/svg/inbox';

function Dashboard() {
  const [name, setName] = useState('');
  const [activeStatus, setActiveStatus] = useState(1);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const date = new Date();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // get date in format 12 december 2021
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/login');
    } else if (!user || !user.name || user._id !== userInfo._id) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails('profile'));
    } else {
      setName(user.name);
    }
  }, [dispatch, userInfo, user, navigate]);

  return (
    <section className="bg-zinc-900 h-[500px] p-8 rounded-lg shadow-md shadow-zinc-900">
      <h1 className="text-white font-bold text-xl">
        {/* good morning */}
        {date.getHours() < 12 && 'Buenos días,'}
        {/* good afternoon */}
        {date.getHours() >= 12 && date.getHours() < 18 && 'Buenas tardes,'}
        {/* good night */}
        {date.getHours() >= 18 && 'Buenas noches,'}
        <span className="text-yellow-400 capitalize"> {name}!</span>
      </h1>
      <h1 className="text-zinc-400 font-bold text-md hover:underline cursor-pointer">{`${day} de ${month} ${year}`}</h1>
      <hr className="border-zinc-500 my-4 rounded-full" />

      <div className="flex flex-col gap-4">
        <Link to="/classroom">
          <button
            type="button"
            onClick={() => setActiveStatus(1)}
            className={
              activeStatus === 1
                ? 'bg-yellow-400 p-2 rounded-sm flex flex-row cursor-pointer items-center gap-2 w-full'
                : 'hover:bg-yellow-400 hover:text-black fill-white hover:fill-black text-white  cursor-pointer p-2 rounded-sm flex flex-row items-center gap-2 w-full'
            }
          >
            <Inbox />
            <h1 className="font-bold text-md tracking-normal">
              Panel Administrativo
            </h1>
          </button>
        </Link>
        <Link to="/classroom/profile">
          <button
            type="button"
            onClick={() => setActiveStatus(2)}
            className={
              activeStatus === 2
                ? 'bg-yellow-400 p-2 rounded-sm flex flex-row cursor-pointer items-center gap-2 w-full'
                : 'hover:bg-yellow-400 hover:text-black fill-white hover:fill-black text-white  cursor-pointer p-2 rounded-sm flex flex-row items-center gap-2 w-full'
            }
          >
            <UserBox />
            <h1 className="font-bold text-md tracking-normal">Mi Cuenta</h1>
          </button>
        </Link>
        <Link to="/classroom/classes">
          <button
            type="button"
            onClick={() => setActiveStatus(3)}
            className={
              activeStatus === 3
                ? 'bg-yellow-400 p-2 rounded-sm flex flex-row cursor-pointer items-center gap-2 w-full'
                : 'hover:bg-yellow-400 hover:text-black fill-white hover:fill-black text-white cursor-pointer p-2 rounded-sm flex flex-row items-center gap-2 w-full'
            }
          >
            <Calendar />
            <h1 className="font-bold text-md tracking-normal">Mis Clases</h1>
          </button>
        </Link>
        <Link to="/classroom/reportes">
          <button
            type="button"
            onClick={() => setActiveStatus(4)}
            className={
              activeStatus === 4
                ? 'bg-yellow-400 p-2 rounded-sm flex flex-row cursor-pointer items-center gap-2 w-full'
                : 'hover:bg-yellow-400 hover:text-black fill-white hover:fill-black text-white  cursor-pointer p-2 rounded-sm flex flex-row items-center gap-2 w-full'
            }
          >
            <Reports />
            <h1 className="font-bold text-md tracking-normal">Mis Reportes</h1>
          </button>
        </Link>
        <button
          type="button"
          onClick={() => setActiveStatus(5)}
          className={
            activeStatus === 5
              ? 'bg-yellow-400 p-2 rounded-sm flex flex-row cursor-pointer items-center gap-2 w-full'
              : 'hover:bg-yellow-400 hover:text-black fill-white hover:fill-black text-white  cursor-pointer p-2 rounded-sm flex flex-row items-center gap-2 w-full'
          }
        >
          <Books />
          <h1 className="font-bold text-md tracking-normal">Mis Materias</h1>
        </button>
        <button
          type="button"
          onClick={() => setActiveStatus(6)}
          className={
            activeStatus === 6
              ? 'bg-yellow-400 p-2 rounded-sm flex flex-row cursor-pointer items-center gap-2 w-full'
              : 'hover:bg-yellow-400 hover:text-black fill-white hover:fill-black text-white  cursor-pointer p-2 rounded-sm flex flex-row items-center gap-2 w-full'
          }
        >
          <Chart />
          <h1 className="font-bold text-md tracking-normal">Estadísticas</h1>
        </button>
      </div>
    </section>
  );
}

export default Dashboard;
