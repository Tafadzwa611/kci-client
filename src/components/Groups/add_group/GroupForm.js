import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  ButtonDefault,
  CustomTextField,
  CustomSelect,
  CustomCheckbox,
  CustomMultiSelect,
  CustomSortableSelect,
  CustomDatePicker,
} from '../../../common';

function ProductForm({groupTypes, loanOfficers, initialValues, validationSchema, membersList, onSubmit}) {
  const groupMembers = membersList.map(member => ({label: member.fullname, value:member.id}));

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Group Information</span>
              </div>
              <CustomInput label='Group Name' name='group_name' type='text' required/>
              <CustomDatePicker label='Group Date' name='loan_product_id' type='group_date'/>
              <CustomSelect label='Group Type' name='group_type_id' required>
                <option value=''>------</option>
                {groupTypes.map(gtype => <option key={gtype.id} value={gtype.id}>{gtype.name}</option>)}
              </CustomSelect>
              <CustomSelect label='Group Officer' name='group_officer_id' required>
                <option value=''>------</option>
                {loanOfficers.map(officer => <option key={officer.id} value={officer.id}>{officer.first_name} {officer.last_name}</option>)}
              </CustomSelect>
              <CustomMultiSelect
                label='Group Members'
                initVals={groupMembers}
                options={groupMembers}
                setFieldValue={setFieldValue}
                name='members'
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

export default ProductForm;