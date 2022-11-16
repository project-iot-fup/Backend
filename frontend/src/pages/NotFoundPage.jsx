import React from 'react';
import { Helmet } from 'react-helmet';

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>

      <section className="h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-white">Not Found :(</h1>
      </section>
    </>
  );
}

export default NotFoundPage;
