import React from 'react';

const DeleteBtn = ({id, handler}) => {
  return (
    <button 
      id={id} 
      onClick={handler} 
      style={{
        background:"#f5424b", 
        color:"#fff", 
        border:"none", 
        borderRadius:".15rem", 
        cursor:"pointer", 
        padding:".2rem .25rem",
        marginLeft:"5px",
        fontSize: "0.75rem",
      }}
      >
        Delete
    </button>
  )
}

export default DeleteBtn;