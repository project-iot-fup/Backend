import React from 'react';
// import Notification from '../assets/icons/notification';

import Card from './Card';

function Tickets() {
  return (
    <section className="w-full max-w-5xl pb-20 mx-auto pt-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-black text-center text-white sm:text-6xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-100">
              Entra a clase!
            </h1>
            <h1 className="mt-2 text-xl text-center font-bold text-white opacity-85">
              Consigue tu tarjeta RFID y comienza a asistir a tus clases.
            </h1>
            <button
              type="button"
              className="shadow-slate-50/50 shadow-md bg-slate-50 py-4 w-44 rounded-md font-bold text-slate-900 mx-auto"
            >
              <h1 className="font-bold">Consiguelo ahora!</h1>
            </button>
          </div>
        </div>
        <div className="flex justify-center pt-12">
          <Card />
        </div>
      </div>
    </section>
  );
}

export default Tickets;
