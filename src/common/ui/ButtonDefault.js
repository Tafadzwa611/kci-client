import React from 'react';

const ButtonDefault = ({id, handler, value}) => {
  return (
    <button id={id} className="btn btn-default" onClick={handler}>
      {value}
    </button>
  )
}

export default ButtonDefault;