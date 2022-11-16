/* eslint-disable react/jsx-props-no-spreading */

import * as React from 'react';

function School(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
      <path d="M12 21l-7-3.8v-6L1 9l11-6 11 6v8h-2v-6.9l-2 1.1v6zm0-8.3L18.85 9 12 5.3 5.15 9zm0 6.025l5-2.7V12.25L12 15l-5-2.75v3.775zm0-6.025zm0 2.25zm0 0z" />
    </svg>
  );
}

export default School;
