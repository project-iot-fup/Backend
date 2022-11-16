/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

function Books(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
      <path d="M8 16h12V4h-2v7l-2.5-1.5L13 11V4H8v12zm0 2q-.825 0-1.412-.587Q6 16.825 6 16V4q0-.825.588-1.413Q7.175 2 8 2h12q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18zm-4 4q-.825 0-1.412-.587Q2 20.825 2 20V6h2v14h14v2zm9-18h5zM8 4h12z" />
    </svg>
  );
}

export default Books;
