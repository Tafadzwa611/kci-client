import React from 'react';

function OperatorSelector(props) {
  const {options, value, handleOnChange} = props;

  return (
    <select onChange={(e) => handleOnChange(e.target.value)} value={value}>
      {options.map(opt => <option key={opt.name} value={opt.name}>{opt.label}</option>)}
    </select>
  )
}

export default OperatorSelector;