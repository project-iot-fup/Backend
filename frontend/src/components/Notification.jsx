/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { listallaveroDetails } from '../actions/llaveroActions';
import Notify from '../assets/svg/notify';

function Notification(props) {
  const dispatch = useDispatch();

  const [tooltipStatus, setTooltipStatus] = useState(0);

  const llaveroDetails = useSelector((state) => state.llaveroDetails);
  const { llavero } = llaveroDetails;
  console.log(llavero);

  return (
    <>
      <button
        type="button"
        onClick={() => setTooltipStatus(1)}
        onMouseLeave={() => setTooltipStatus(0)}
      >
        <Notify className="fill-white" />
      </button>
      {tooltipStatus === 1 && (
        <>
          <div
            role="tooltip"
            className="z-50 top-16 w-64 absolute transition duration-150 ease-in-out ml-8  p-4 rounded bg-black/80 shadow-md shadow-black"
          >
            <svg
              width={16}
              height={10}
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              {...props}
            >
              <path
                d="M8 10L0 0L16 1.41326e-06L8 10Z"
                className="fill-black/80"
              />
            </svg>
            <h1 className="text-white">Notificaciones</h1>
            {llavero.length > 0 ? (
              <>
                <h1 className="text-white">
                  {llavero[0].tag_status === true ? (
                    <span>
                      <h1>
                        Estado del tag es:
                        <span className="text-green-500"> Activo</span>
                      </h1>
                    </span>
                  ) : (
                    <span>
                      <h1>
                        Estado del tag es:
                        <span className="text-red-500"> Inactivo</span>
                      </h1>
                    </span>
                  )}
                </h1>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Notification;
