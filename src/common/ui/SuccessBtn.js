import React from 'react';

const SuccessBtn = ({ handler, value }) => {
  return (
    <div style={{margin:"20px 0"}}>
      <button type='button' className='btn btn-success' onClick={handler}>{value}</button>
    </div>
  )
}

export default SuccessBtn;