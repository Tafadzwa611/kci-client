import React from 'react';

function RemoveRuleAction(props) {
  const {handleOnClick} = props;

  return (
    <button type='submit' className='btn btn-info' onClick={e => handleOnClick(e)} >X</button>
  )
}

export default RemoveRuleAction;