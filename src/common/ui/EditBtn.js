import React from 'react';

const EditBtn = ({handler}) => {
  return (
    <i style={{fontSize: '20px'}} className='fa fa-pencil-square-o' onClick={handler}></i>
  )
}

export default EditBtn;