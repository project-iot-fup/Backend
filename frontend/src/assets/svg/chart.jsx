/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

function Chart(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
      <path d="M7 17h2v-7H7zm4 0h2V7h-2zm4 0h2v-4h-2zM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21zm0-2h14V5H5v14zM5 5v14V5z" />
    </svg>
  );
}

export default Chart;
