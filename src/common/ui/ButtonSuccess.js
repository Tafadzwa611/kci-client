import React from 'react';

const ButtonSuccess = ({handler, value}) => {
  return (
    <button className="btn btn-success" onClick={handler}>
      {value}
    </button>
  )
}

export default ButtonSuccess;