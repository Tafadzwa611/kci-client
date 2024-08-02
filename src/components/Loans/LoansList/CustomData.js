import React from 'react';

function CustomData({fieldset}) {
  return (
    <div>
      <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
        {fieldset.values.map(value => <li key={value.id}>{value.name}: {value.data}</li>)}
      </ul>
    </div>
  )
}

export default CustomData;