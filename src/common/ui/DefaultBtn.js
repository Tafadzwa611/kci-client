import React from 'react';

const DefaultBtn = ({ handler, value }) => {
  return (
    <div style={{margin:"20px 0"}}>
      <button type='button' className='btn btn-default' onClick={handler}>{value}</button>
    </div>
  )
}

export default DefaultBtn;