import React from 'react';

function CheckBox({label, isChecked, onChange}) {
  return (
    <div>
      <label>
        <input type='checkbox' checked={isChecked} onChange={onChange} />
        <span>{label}</span>
      </label>
    </div>
  )
}

export default CheckBox;