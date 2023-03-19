import React from 'react';

const Button = ({handler, value}) => {
  return (
    <button onClick={handler}>
      {value}
    </button>
  )
}

export default Button;