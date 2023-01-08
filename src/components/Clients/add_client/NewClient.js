import React from 'react';
import { CustomRadio } from '../../../common';
import { Form, Formik } from 'formik';

const NewClient =() => {
  return (
    <>
      <CustomRadio label='Individual Client' name='client_type' type='text' value='individual'/>
      <CustomRadio label='Add to Existing Group' name='client_type' type='text' value='corporate'/>
    </>
  )
}

export default NewClient;