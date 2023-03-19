import React from 'react';

const DeleteModal = ({children}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div>
          <i className="uil uil-info-circle modal_circle"></i>
        </div>
        <>
          {children}
        </>
      </div>
    </div>
  )
}

export default DeleteModal;