/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Helmet } from 'react-helmet';

import Assistance from '../../assets/svg/assistance';
import Missed from '../../assets/svg/missed';
import Upconming from '../../assets/svg/upconming';

function ClassroomClassPage() {
  return (
    <>
      <Helmet>
        <title>Mis Clases</title>
      </Helmet>
      <section className="w-full h-full">
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-2 flex flex-row gap-2">
            <span className="flex flex-row gap-4 bg-zinc-900 rounded-lg shadow-lg shadow-zinc-900 p-7 items-center w-full">
              <Assistance className="fill-green-500" />
              <div className="flex flex-col">
                <span className="text-white text-xl font-bold">
                  Asistencias
                </span>
                <span className="text-white text-sm">
                  Has asistido a 5 clases
                </span>
              </div>
            </span>
            <span className="flex flex-row gap-4 bg-zinc-900 rounded-lg shadow-lg shadow-zinc-900 p-7 items-center w-full">
              <Missed className="fill-red-500" />
              <div className="flex flex-col">
                <span className="text-white text-xl font-bold">Faltas</span>
                <span className="text-white text-sm">
                  Has faltado a 2 clases
                </span>
              </div>
            </span>
            <span className="flex flex-row gap-4 bg-zinc-900 rounded-lg shadow-lg shadow-zinc-900 p-7 items-center w-full">
              <Upconming className="fill-yellow-500" />
              <div className="flex flex-col">
                <span className="text-white text-xl font-bold">
                  Siguiente clase
                </span>
                <span className="text-white text-sm">
                  Creditos Libres II - 6:00 PM
                </span>
              </div>
            </span>
          </div>
          <div className="col-span-2 w-full lg:h-[450px] bg-zinc-900 shadow-md shadow-zinc-900 rounded-md overflow-hidden relative p-6">
            <h1 className="text-white text-2xl font-bold">
              Mi Horario de Clases
            </h1>
            <hr className="my-4 border-zinc-700/80" />
            <div className="grid grid-cols-5 gap-2 pt-2">
              <span className="col-span-1 flex flex-col gap-2 items-center">
                <span className="text-white text-md uppercase font-bold underline">
                  Lunes
                </span>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16">
                  <span className="text-white text-sm">Creditos Libres II</span>
                  <span className="text-white text-xs">6:00 PM</span>
                </div>
              </span>
              <span className="col-span-1 flex flex-col gap-2 items-center">
                <span className="text-white text-md uppercase font-bold underline">
                  Martes
                </span>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16">
                  <span className="text-white text-sm">Creditos Libres II</span>
                  <span className="text-white text-xs">6:00 PM</span>
                </div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
              </span>
              <span className="col-span-1 flex flex-col gap-2 items-center">
                <span className="text-white text-md uppercase font-bold">
                  Miercoles
                </span>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16">
                  <span className="text-white text-sm">Creditos Libres II</span>
                  <span className="text-white text-xs">6:00 PM</span>
                </div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
              </span>
              <span className="col-span-1 flex flex-col gap-2 items-center">
                <span className="text-white text-md uppercase font-bold underline">
                  Jueves
                </span>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
              </span>
              <span className="col-span-1 flex flex-col gap-2 items-center">
                <span className="text-white text-md uppercase font-bold underline">
                  Viernes
                </span>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
                <div className="border-2 px-4 py-3 border-zinc-700/80 border-dashed rounded-lg flex flex-col justify-center items-center w-36 h-16 bg-zinc-700/20"></div>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClassroomClassPage;
