import React from 'react';
import { CustomRadio } from '../../../common';

const NewClient =() => {
  return (
    <>
      <CustomRadio label='Individual Client' name='client_type' type='text' value='individual'/>
      <CustomRadio label='Add to Existing Group' name='client_type' type='text' value='corporate'/>
    </>
  )
}

export default NewClient;