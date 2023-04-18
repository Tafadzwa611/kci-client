import React from 'react';

const ActionModal = ({children, text}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div>
          {text == 'add'?
            <i className="uil uil-check-circle modal_circle_approve"></i>:
            <i className="uil uil-info-circle modal_circle"></i>
          }

        </div>
        <>
          {children}
        </>
      </div>
    </div>
  )
} 

export default ActionModal;