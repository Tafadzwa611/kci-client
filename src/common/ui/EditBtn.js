import React from 'react';

const EditBtn = ({handler, id}) => {
  return (
    <button id={id} onClick={handler}>Edit</button>
  )
}

export default EditBtn;