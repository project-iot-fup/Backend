/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

function Warning(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
      <path d="M1 21L12 2l11 19zm3.45-2h15.1L12 6zM12 18q.425 0 .713-.288Q13 17.425 13 17t-.287-.712Q12.425 16 12 16t-.712.288Q11 16.575 11 17t.288.712Q11.575 18 12 18zm-1-3h2v-5h-2zm1-2.5z" />
    </svg>
  );
}

export default Warning;
