import React from 'react';
import SubmitButton from './SubmitButton';

const DeleteDialog = ({msg, isSubmitting}) => {
  return (
    <div>
      {msg}
      <SubmitButton isSubmitting={isSubmitting}/>
    </div>
  )
}

export default DeleteDialog;