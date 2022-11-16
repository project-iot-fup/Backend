/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Helmet } from 'react-helmet';

import Graphs from '../../components/Graphs';

function ClassroomHomePage() {
  return (
    <>
      <Helmet>
        <title>Panel Administrativo</title>
      </Helmet>

      <section className="w-full h-full bg-zinc-900 shadow-md shadow-zinc-900 rounded-md overflow-hidden relative">
        <h1>Classroom Home Page</h1>
        <Graphs />
      </section>
    </>
  );
}

export default ClassroomHomePage;
