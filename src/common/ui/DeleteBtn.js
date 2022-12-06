import React from 'react';

const DeleteBtn = ({id, handler}) => {
  return (
    <button id={id} onClick={handler}>Delete</button>
  )
}

export default DeleteBtn;