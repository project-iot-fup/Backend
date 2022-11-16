/* eslint-disable react/button-has-type */
import React from 'react';
// import School from '../assets/svg/school';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// icons
import School from '../assets/svg/school';
import UserCircle from '../assets/svg/userCircle';
import Logout from '../assets/svg/logout';
// import Help from '../assets/svg/help';

import Notification from './Notification';

import { logout } from '../actions/userActions';

import DarkModeSwitch from './DarkModeSwitch';
import Faq from './Faq';

function Header() {
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
  return (
    <section className="z-50 w-full bg-zinc-900 absolute py-4">
      <div className=" container mx-auto px-56 grid grid-cols-3 gap-0">
        <div className="col-span-1 flex justify-start items-center">
          <h1 className="text-white font-bold text-xl">
            <Link to="/">FUP</Link>
          </h1>
        </div>
        <div className="col-span-2 flex flex-row items-center justify-end gap-4">
          <DarkModeSwitch />
          {userInfo ? (
            <>
              <Link to="/classroom">
                <School className="fill-white" />
              </Link>
              <Notification className="absolute z-10 -top-[10px] rotate-180 left-[155px]" />
              <button onClick={logoutHandler}>
                <Logout className="fill-white" />
              </button>
            </>
          ) : (
            <Link to="/auth/login">
              <UserCircle className="fill-white" />
            </Link>
          )}
          <Faq className="absolute z-10 -top-[10px] rotate-180 left-[200px]" />
        </div>
      </div>
    </section>
  );
}

export default Header;
