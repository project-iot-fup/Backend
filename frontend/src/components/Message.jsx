/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Close from '../assets/svg/close';

function Message(props) {
  return (
    <div className="flex-col space-y-4 min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-end items-end inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-0">
      <div className="flex flex-col p-8 bg-zinc-900 shadow-md hover:shodow-lg rounded-2xl mb-16 mr-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center relative">
            <span className="rounded-2xl p-5 bg-black items-center justify-center">
              {props.icon}
            </span>
            <div className="flex flex-col ml-3">
              <div className="font-medium leading-none" {...props}>
                {props.message}
              </div>
              <p className="text-sm text-gray-300 leading-none mt-1">
                {props.description}
              </p>
            </div>
            <button
              type="button"
              onClick={props.onClick}
              className="absolute fill-zinc-400 right-0 -top-4"
            >
              <Close />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
