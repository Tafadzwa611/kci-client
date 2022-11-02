import React from 'react';

function AddRuleAction(props) {
  const {handleOnClick} = props;

  return (
    <button type='submit' className='btn btn-info' onClick={e => handleOnClick(e)} >Add Rule</button>
  )
}

export default AddRuleAction;