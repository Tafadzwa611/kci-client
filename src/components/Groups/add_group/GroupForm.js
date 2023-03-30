import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect,
  CustomDatePicker,
  CustomSelectRemote
} from '../../../common';

function GroupForm({groupTypes, loanOfficers, initialValues, validationSchema, onSubmit}) {

  // const onSubmit = (values) => {
  //   console.log(values);
  // }

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Group Information</span>
              </div>
              <CustomInput label='Group Name' name='name' type='text' required/>
              <CustomDatePicker label='Group Date' name='group_date' setFieldValue={setFieldValue} required/>
              <CustomSelect label='Group Type' name='group_type_id' required>
                <option value=''>------</option>
                {groupTypes.map(gtype => <option key={gtype.id} value={gtype.id}>{gtype.name}</option>)}
              </CustomSelect>
              <CustomSelect label='Group Officer' name='group_officer_id' required>
                <option value=''>------</option>
                {loanOfficers.map(officer => <option key={officer.id} value={officer.id}>{officer.first_name} {officer.last_name}</option>)}
              </CustomSelect>
              <CustomSelectRemote
                label='Group Members'
                url='/clientsapi/search_client/'
                setFieldValue={setFieldValue}
                queryParamName='query'
                placeholder='Search Client'
                name='members'
                isMulti
                required
              />
              <CustomInput label='Group Phone Number' name='group_phone_number' type='text' required/>
              <CustomInput label='Group Address' name='address' type='text' required/>
              <CustomInput label='Group Account Number' name='group_account_number' type='text' required/>
              <CustomInput label='Group Bank Name' name='group_bank_name' type='text' required/>
              <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
              <div style={{display:'flex', justifyContent: 'flex-end'}}> 
              <SubmitButton isSubmitting={isSubmitting}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default GroupForm;