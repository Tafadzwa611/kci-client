import React from 'react';

const EditBtn = ({handler, id}) => {
  return (
    <button 
      id={id} 
      onClick={handler} 
      style={{
        background:"#1bbf5f", 
        color:"#fff", 
        border:"none", 
        borderRadius:".15rem", 
        cursor:"pointer", 
        padding:".2rem .25rem",
        fontSize: "0.75rem",
        marginLeft:"5px",
      }}
      >
        Edit
    </button>
  )
}

export default EditBtn;