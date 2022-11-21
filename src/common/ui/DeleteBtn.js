import React from 'react';

const DeleteBtn = ({handler}) => {
  return (
    <i style={{fontSize: '20px'}} className='fa fa-trash' onClick={handler}></i>
  )
}

export default DeleteBtn;