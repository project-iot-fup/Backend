/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

function Barcode(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
      <path d="M1 19V5h2v14zm3 0V5h2v14zm3 0V5h1v14zm3 0V5h2v14zm3 0V5h3v14zm4 0V5h1v14zm3 0V5h3v14z" />
    </svg>
  );
}

export default Barcode;
