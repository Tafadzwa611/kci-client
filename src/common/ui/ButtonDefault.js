import React from 'react';

const ButtonDefault = ({handler, value}) => {
  return (
    <button className="btn btn-default" onClick={handler}>
      {value}
    </button>
  )
}

export default ButtonDefault;