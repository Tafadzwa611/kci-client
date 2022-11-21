import React from 'react';

const Select = (props) => {
  return (
    <div style={{width: '20%', display: 'flex', columnGap: '5px'}}>
      <select {...props} className='custom-select-form row-form'/>
    </div>
  )
}

export default Select;